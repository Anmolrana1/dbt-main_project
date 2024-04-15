import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Import jwtDecode for decoding JWT tokens
import { useNavigate } from 'react-router-dom';

function ChangePassword({isLoggedIn}) {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const [ResetData, setResetData] = useState({ token: token, Password: "" });
  const [OldPassword, setOldPassword] = useState('');
  const [DefaultPassword, setDefaultPassword] = useState(''); // State for old password
  const [Password, setPassword] = useState(''); // State for new password


  useEffect(() => {
    if (token) {
      // Decode token to retrieve password
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token:", decodedToken); // Debug statement
      if (decodedToken && decodedToken.Password) {
        setDefaultPassword(decodedToken.Password);
        console.log("Password:", decodedToken.Password); // Debug statement
      }
    }
  }, [token]);
  

  const handleReset = async () => {
    if (Password !== ResetData.Password) {
      return alert("Passwords do not match");
    }
    console.log(DefaultPassword," ",OldPassword)
    if (OldPassword !== DefaultPassword) {
      alert("Invalid token or missing password.");
      return;
    }
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(Password)) {
      alert("Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 8 characters long.");
      return;
    }

    try {
      console.log("ResetData", ResetData);
      const response = await axios.post(
        "http://localhost:5000/auth/Reset",
        ResetData
      );
      if (response.status === 200) {
        alert("Password reset successful");
        console.log("Password reset successful");
        setResetData({ token: "", Password: "" });
        setOldPassword(''); // Reset old password state
        setPassword(''); // Reset new password state
        navigate("/");
      } else {
        throw new Error("Password reset failed");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      // Handle error (e.g., display an error message)
    }
  };

  const handleChange = (e, fieldName) => {
    const value = e.target.value;
    setResetData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "rgb(220, 220, 220)" ,boxShadow:
    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
      <div className="container py-8 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "2rem" }}>
              <div className="row ">
                <div className="col-md-6 col-lg-5 d-none d-md-block mt-5">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/002/999/216/non_2x/user-password-login-vector.jpg"
                    alt="login form"
                    className="img-fluid "
                    style={{ borderRadius: " 1rem 0 0 1rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div
                    className="card-body p-4 p-lg-5 text-black shadow-lg p-3 bg-white "
                    style={{ borderRadius: "2rem" }}
                  >
                    <form>
                      <div className="d-flex align-items-center justify-content-center mb-3 pb-1">
                        <i
                          className="fas fa-cubes  fa-2x me-3"
                          style={{ color: "#ff6219" }}
                        ></i>
                        <span className="h1 fw-bold  mb-0 ">Forgot Password</span>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example22"
                          className="form-control form-control-lg"
                          value={OldPassword} // Use OldPassword state
                          onChange={(e) => setOldPassword(e.target.value)} // Update OldPassword state
                          placeholder="Enter your old password*"
                          minLength={8}
                          required
                        />
                        <label className="form-label" htmlFor="form2Example22">
                          Temporary Password*
                        </label>
                        <div className="form-text">Password must be at least 8 characters long.</div>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example27"
                          className="form-control form-control-lg"
                          value={ResetData.Password}
                          onChange={(e) => handleChange(e, "Password")}
                          placeholder="Enter your new password*"
                          minLength={8}
                          required
                        />
                        <label className="form-label" htmlFor="form2Example27">
                          New Password*
                        </label>
                        <div className="form-text">Password must be at least 8 characters long.</div>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example28"
                          className="form-control form-control-lg"
                          value={Password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Repeat your new password*"
                          minLength={8}
                          required
                        />
                        <label className="form-label" htmlFor="form2Example28">
                          Repeat Password*
                        </label>
                      </div>

                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="button"
                          onClick={handleReset}
                        >
                          Reset
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChangePassword;
