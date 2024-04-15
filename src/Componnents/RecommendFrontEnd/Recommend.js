import React, { useState } from "react";
import UserSidebar from "../user/UserSidebar";
import axios from "axios";

const EmployeeRecommendations = () => {
  const [requirements, setRequirements] = useState({
    techStack: [],
    proficiency: [],
  });
  const [skill, setSkill] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "techStack") {
      setSkill(value);
    } else {
      setProficiency(value);
    }
  };

  const handleAddSkill = () => {
    if(skill==='' || proficiency===''){
      alert('please fill the form correctly')
      return
    }
    if(recommendations.length>0){
      setRecommendations([])
      setRequirements({})
    }
    const updatedTechStack = [...requirements.techStack];
    const updatedProficiency = [...requirements.proficiency];
if (updatedTechStack.includes(skill)) {
      alert("Skill already present .");
      return;
    }
    updatedTechStack.push(skill);
    
    updatedProficiency.push(proficiency);

    setRequirements((prev) => ({
      ...prev,
      techStack: updatedTechStack,
      proficiency: updatedProficiency,
    }));
    setShow(true);
    setSkill("");
    setProficiency("");
  };

  const handleRecommendations = async () => {
    
    setShow(false);
    setLoading(true);
    setRequirements({
      techStack: [],
      proficiency: [],
    });
    try {
      const response = await axios.post("http://127.0.0.1:5000/recommend", {
        tech_stack: requirements.techStack,
        proficiency: requirements.proficiency,
      });
      setRecommendations(response.data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setError("Error fetching recommendations. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex" }}>
      <UserSidebar />
      <div
        style={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontWeight: "bold",
            color: "#333",
            marginBottom: "20px",
            margin: "2rem",
            textDecoration: "underline",
          }}
        >
          Employees Recommendation
        </h1>
        <div style={{ marginBottom: "20px" }}>
          <table>
            <tbody>
              <tr style={{ marginBottom: "20px" }}>
                <td>
                  <label htmlFor="techStack" style={{ marginRight: "10px" }}>
                    Enter a skill:
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    style={{ width: "100%" }}
                    name="techStack"
                    className="form-control"
                    placeholder="Skill name..."
                    value={skill}
                    onChange={handleChange}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <label htmlFor="proficiency" style={{ marginRight: "10px" }}>
                    Proficiency Level:
                  </label>
                </td>
                <td>
                  <select
                    className="form-select"
                    id="proficiency"
                    name="proficiency"
                    value={proficiency}
                    onChange={handleChange}
                  >
                    <option value="">Select a Proficiency Level...</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <button
                    type="button"
                    className="btn btn-primary btn-block mt-4"
                    onClick={handleAddSkill}
                  >
                    Add skill
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {show ? (
          requirements.techStack.length > 0 ? (
            <div>
              <h3>Selected Skills:</h3>
              <div
                className="d-flex flex-row"
                style={{ justifyContent: "center" }}
              >
                {requirements.techStack.map((item, index) => (
                  <div className="m-2" key={index}>
                    <div
                      className="card"
                      style={{
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                        borderRadius: "2rem",
                      }}
                    >
                      <div className="card-body">
                        <h6 className="card-title">{item.toUpperCase()}</h6>
                        <h8>{requirements.proficiency[index].toUpperCase()}</h8>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p></p>
          )
        ) : (
          ""
        )}
        {requirements.techStack.length > 0 ? (
          <button
            onClick={handleRecommendations}
            style={{ marginBottom: "20px" }}
            className="btn btn-primary btn-block mt-4"
            disabled={requirements.techStack.length === 0 || loading}
          >
            {loading ? "Loading..." : "Get Recommendations"}
          </button>
        ) : (
          ""
        )}
        <div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {recommendations.length > 0 && (
            <>
              <h3
                style={{
                  fontWeight: "bold",
                  color: "#333",
                  marginBottom: "20px",
                  margin: "2rem",
                  textDecoration: "underline",
                }}
              >
                Top 10 Recommended Employees:
              </h3>
              <div
                className="row justify-content-center "
                style={{ marginLeft: "2rem" }}
              >
                {recommendations.slice(-10).map((recommendation, index) => (
                  <div className="col-md-4 mb-4" key={index}>
                    <div
                      className="card"
                      style={{
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                      }}
                    >
                      <div className="card-body">
                        <h5 className="card-title">{recommendation.Name}</h5>
                        <p className="card-text">
                          <b>Employee ID:</b> {recommendation.Empid}
                        </p>
                        <p className="card-text">
                          Similarity Score:{" "}
                          {recommendation.similarity_score * 100}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeRecommendations;
