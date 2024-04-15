import React, { useEffect, useState } from "react";
import UserSidebar from "./UserSidebar";
import axios from "axios";

function Certificate() {
  const [certificateDetails, setCertificateDetails] = useState({
    Email: "",
    certificateName: "",
    issuingOrganization: "",
    issueDate: "",
    ExpireDate:"",
    credentialID: "",
    Status: "",
  });
 
  const [Email, setEmail] = useState("");
  const [userCertificates, setUserCertificates] = useState([]);
  const [skill, setSkill] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const Email = localStorage.getItem("email");
    setEmail(Email);
    setCertificateDetails((prev) => ({
      ...prev,
      Email: Email,
      Status: "Pending"
    }),[]);

    async function fetchCertificates() {
      try {
        const response = await axios.post(
          "http://localhost:5000/profile/getCertificates",
          { Email }
        );
        console.log(response.data.certificates)
        setUserCertificates(response.data.certificates);
        setLoading(false);
      } catch (error) {
        console.error("Error retrieving user certificates:", error);
        setError("Error retrieving user certificates. Please try again later.");
        setLoading(false);
      }
    }

    fetchCertificates();
    async function fetchSkill() {
    try {
      
      const response = await axios.post(
        "http://localhost:5000/profile/getSkill",
        { Email }
      );
      setSkill(response.data.user);
      setLoading(false);
    } catch (error) {
      console.error("Error retrieving user data:", error);
      setError("Error retrieving user data. Please try again later.");
      setLoading(false);
    }
    }
    fetchSkill();
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
    if (!certificateDetails.certificateName) {
      alert("Please fill in certificate Name");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/profile/addCertificate",
        certificateDetails
      );

      if (response.status === 200) {
        alert("Certificate added successfully");
        // Fetch the updated list of certificates after adding the new certificate
        const updatedResponse = await axios.post(
          "http://localhost:5000/profile/getCertificates",
          { Email }
        );
        setUserCertificates(updatedResponse.data.certificates);
        setCertificateDetails({
          Email: Email,
          certificateName: "",
          issuingOrganization: "",
          issueDate: "",
          ExpireDate:"",
          credentialID: "",
          Status: "pending",
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
      <div style={{display:'block',marginLeft:'2rem',width:'100%',minHeight:'100%'}}>
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
                style={{
                  fontWeight: "bold",
                  color: "#333",
                  marginBottom: "20px",
                  margin: "2rem",
                  textDecoration: "underline",
                }}
              >
                Add Certificate 
              </h2>
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Certificate Name:</td>
                    <td>
                                              <select
                          className="form-select"
                          id="skillName"
                          placehole
                          onChange={(e) => handleChange(e, "certificateName")}
                          value={certificateDetails.certificateName}
                        >
                          <option value="">Select a Certificate...</option>
                          {skill.map((item, index) => (
                            <option value={item.skillName} key={index}>
                              {item.skillName}
                            </option>
                          ))}
                        </select>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Issuing Organization:</td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        id="issuingOrganization"
                        value={certificateDetails.issuingOrganization}
                        onChange={(e) => handleChange(e, "issuingOrganization")}
                        placeholder="Enter issuing organization"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Issue Date:</td>
                    <td>
                      <input
                        type="date"
                        className="form-control"
                        id="issueDate"
                        value={certificateDetails.issueDate}
                        onChange={(e) => handleChange(e, "issueDate")}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Expire Date:</td>
                    <td>
                      <input
                        type="date"
                        className="form-control"
                        id="ExpireDate"
                        value={certificateDetails.ExpireDate}
                        onChange={(e) => handleChange(e, "ExpireDate")}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Credential ID:</td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        id="credentialID"
                        value={certificateDetails.credentialID}
                        onChange={(e) => handleChange(e, "credentialID")}
                        placeholder="Enter credential ID"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button type="submit" className="btn btn-primary btn-block mt-4">
                Add Certificate
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="container mt-5">
  <h3 className="mb-4" style={{
            fontWeight: "bold",
            color: "#333",
            marginBottom: "20px",
            margin: "2rem",
            textDecoration: "underline",
          }}>
    Your Certificates
  </h3>
  {loading ? (
  <p>Loading...</p>
) : error ? (
  <p>{error}</p>
) : userCertificates.length > 0 ? (
  <div className="table-responsive">
    <table className="table table-striped">
      <thead style={{ backgroundColor: '#f0f0f0', color: 'black' }}>
        <tr>
          <th scope="col">Certificate Name</th>
          <th scope="col">Issuing Organization</th>
          <th scope="col">Issue Date</th>
          <th scope="col">Expire Date</th>
          <th scope="col">Credential ID</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        {userCertificates.map((item) => (
          <tr key={item._id}>
            <td>{item.certificateName ? item.certificateName.toUpperCase() : ""}</td>
            <td>{item.issuingOrganization ? item.issuingOrganization.toUpperCase() : ""}</td>
            <td>{new Date(item.issueDate).toLocaleDateString('en-US')}</td>
            <td>{new Date(item.ExpireDate).toLocaleDateString('en-US')}</td>
            <td>{item.credentialID ? item.credentialID.toUpperCase() : ""}</td>
            <td>{item.Status ? item.Status.toUpperCase() : ""}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
) : (
  <p>No Certificates To Show</p>
)}
</div>
</div>

    </div>
  );
}

export default Certificate;