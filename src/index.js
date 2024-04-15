import React from 'react';
import ReactDOM from 'react-dom'; // Import ReactDOM correctly
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './Componnents/AuthContext';

ReactDOM.render(

    <AuthProvider>
      <App />
    </AuthProvider>
  ,
  document.getElementById('root')
);

reportWebVitals();

