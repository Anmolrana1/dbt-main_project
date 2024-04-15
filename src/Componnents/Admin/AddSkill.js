import React, { useEffect, useState } from "react";
import UserSidebar from "../user/UserSidebar";
import axios from "axios";


function AddSkill() {

  const [certificateDetails, setCertificateDetails] = useState({
    skillName:""
  });

  const [userCertificates, setUserCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      // Redirect if user is not logged in or not an admin

  
      try {
        const response = await axios.post(
          "http://localhost:5000/profile/getAddedSkill"
        );
        setUserCertificates(response.data.skill);
        setLoading(false);
      } catch (error) {
        console.error("Error retrieving user certificates:", error);
        setError("Error retrieving user certificates. Please try again later.");
        setLoading(false);
      }
    };
  
    fetchData(); // Call fetchData function
  
  }, []); 
  

  const handleChange = (e, fieldName) => {
    const value = e.target.value;
    setCertificateDetails((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!certificateDetails.skillName) {
      alert("Please fill in certificate Name");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/profile/getAddedSkill",
        certificateDetails
      );

      if (response.status === 200) {
        alert("Certificate added successfully");
        // Fetch the updated list of certificates after adding the new certificate
        const updatedResponse = response.data.skill
        setUserCertificates(updatedResponse.data.certificates);
        setCertificateDetails({
            skillName:""
        });
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Certificate already exists or there was an issue adding the certificate");
    }
  };
  return (
    <div style={{display:'flex'}}>
      <UserSidebar />
      <div style={{display:'block',width:'100%',minHeight:'100vh'}}>
      <div
        className="container mt-4 p-4"
        style={{
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          borderRadius: "2rem",
        }}
      >
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form className="custom-form mt-4" onSubmit={handleSubmit}>
              <h2
                className="mb-4"
                style={{ fontFamily: "monospace", fontWeight: "bold" }}
              >
                Add Skill
              </h2>
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Skill Name:</td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        id="certificateName"
                        value={certificateDetails.skillName}
                        onChange={(e) => handleChange(e, "skillName")}
                        placeholder="Enter skill name"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button type="submit" className="btn btn-primary btn-block mt-4">
                Add skill
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="container mt-5">
  <h3 className="mb-4" style={{ fontFamily: "monospace", fontWeight: "bolder" }}>
    Added Skills
  </h3>
  {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : userCertificates.length > 0 ? (
          <div className="row">
            {userCertificates.map((item) => (
              <div className="col-md-4 mb-4" key={item._id}>
                <div
                  className="card"
                  style={{
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    borderRadius: "2rem",
                
                  }}
                >
                  <div className="card-body">
                    <h6 className="card-title">
                      {item.skillName ? item.skillName.toUpperCase() : ""}
                    </h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No Skills To Show</p>
        )}
</div>
</div>
    </div>
  );
}

export default AddSkill;

// import React from 'react'

// function AddSkill() {
//   return (
//     <div>AddSkill</div>
//   )
// }

// export default AddSkill