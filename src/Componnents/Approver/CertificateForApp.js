import React, { useEffect, useState } from "react";
import UserSidebar from "../user/UserSidebar";
import axios from "axios";


function CertificateForApp() {

  const [userCertificates, setUserCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    setEmail(storedEmail);
    if (storedEmail) {
      fetchCertificates(storedEmail);
    }
  }, []);

  async function fetchCertificates(Email) {
    
    try {
      const response = await axios.post(
        "http://localhost:5000/profile/getCertificates",
        { Email,command:'yes' }
      );
      setUserCertificates(response.data.certificates);
      console.log(response.data.certificates)
      setLoading(false);
    } catch (error) {
      console.error("Error retrieving user certificates:", error);
      setError("Error retrieving user certificates. Please try again later.");
      setLoading(false);
    }
  }

  const handleApprove = async (id,Empid) => {
    console.log(id)
    try {
      const response = await axios.post(
        "http://localhost:5000/profile/approveCertificate",
        { command: "Approve",Empid ,id}
      );
      if (response.status === 200) {
        alert("Approved");
        fetchCertificates(email);
      }
    } catch (error) {
      console.error("Error approving certificate:", error);
      setError("Error approving certificate. Please try again later.");
    }
  };

  const handleReject = async (id,Empid) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/profile/approveCertificate",
        {  command: "Reject",Empid ,id}
      );
      if (response.status === 200) {
        alert("Rejected");
        fetchCertificates(email);
      }
    } catch (error) {
      console.error("Error rejecting certificate:", error);
      setError("Error rejecting certificate. Please try again later.");
    }
  };

  return (
    <div style={{display:'flex' ,minHeight:'100vh'}}>
      <UserSidebar />
      <div className="container mt-5">
        <h3 className="mb-4">Certificates For Approval</h3>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : userCertificates.filter((item) => item.Status === "Pending").length > 0 ? (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Certificate Name</th>
                  <th>Issuing Organization</th>
                  <th>Issue Date</th>
                  <th>Expire Date</th>
                  <th>Credential ID</th>
                  <th>Status</th>
                  <th>Approve</th>
                  <th>Reject</th>
                </tr>
              </thead>
              <tbody>
                {userCertificates.filter((item) => item.Status === "Pending")
                  .map((item) => (
                    <tr key={item._id}>
                      <td>{item.Empid}</td>
                      <td>{item.certificateName}</td>
                      <td>{item.issuingOrganization}</td>
                      <td>{new Date(item.issueDate).toLocaleDateString()}</td>
                      <td>{new Date(item.ExpireDate).toLocaleDateString()}</td>
                      <td>{item.credentialID}</td>
                      <td>{item.Status}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary btn-block"
                          onClick={() => handleApprove(item._id,item.Empid)}
                        >
                          Approve
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary btn-block"
                          onClick={() => handleReject(item._id,item.Empid)}
                        >
                          Reject
                        </button>
                      </td>
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
  );
}

export default CertificateForApp;
