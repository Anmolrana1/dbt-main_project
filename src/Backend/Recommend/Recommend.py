from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nltk.stem import PorterStemmer
import numpy as np
import pandas as pd
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load or define your merged_data here
merged_data = pd.read_csv('Transformed_data.csv')

# Convert dictionary to DataFrame
df = pd.DataFrame(merged_data)

# Apply stemming to the combined text of certificate_name, skill_name,skill_proficiency, and tech_stack
def stem_text(text):
    stemmer = PorterStemmer()
    # Convert text to lowercase and then apply stemming
    stemmed_words = [stemmer.stem(word.lower()) for word in text.split(',')]
    return ' '.join(stemmed_words)

df['combined_text'] = df['certificate_name'] + ',' + df['skill_name'] + ',' + df['tech_stack'] + ',' + df['skill_proficiency']
df['stemmed_text'] = df['combined_text'].apply(stem_text)

@app.route('/recommend', methods=['POST'])
def recommend_employees():
    # Receive required tech stack and proficiency from the request
    data = request.json
    required_tech_stack = data.get('tech_stack')
    required_proficiency = data.get('proficiency')

    # Convert requirements to lowercase
    required_tech_stack = [stack.lower() for stack in required_tech_stack]
    required_proficiency = [proficiency.lower() for proficiency in required_proficiency]

    required_tech_stack=', '.join(required_tech_stack)
    proficiency_string = ', '.join(required_proficiency)

    # Create feature vector for required tech stack
    combined_requirement = required_tech_stack + ',' + proficiency_string
    required_tech_stack_vector = stem_text(combined_requirement)

    # Create feature vectors
    vectorizer = TfidfVectorizer()
    X = vectorizer.fit_transform(df['stemmed_text'])

    # Calculate cosine similarity with the required tech stack vector
    similarities = cosine_similarity(X, vectorizer.transform([required_tech_stack_vector]))

    # Add similarity scores to DataFrame
    df['similarity_score'] = similarities.flatten()

    # Sort employees based on similarity score and select top 10
    top_10_employees = df.nlargest(10, 'similarity_score')

    # Return top 10 employee recommendations
    recommendations = top_10_employees[['Empid', 'Name', 'similarity_score']].to_dict(orient='records')
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True)
