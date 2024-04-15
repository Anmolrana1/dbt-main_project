import React, { useEffect, useState } from "react";
import UserSidebar from "../user/UserSidebar";
import axios from "axios";

function ProjectExperence() {

  const [Email, setEmail] = useState("");
  const [userProjects, setUserProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    setEmail(storedEmail);
    if (storedEmail) {
      fetchProjects(storedEmail);
    }
  }, []);

  async function fetchProjects(Email) {
  
    try {  
      const response = await axios.post(
        "http://localhost:5000/profile/getProjectExperiences",
        { Email }
      );
      setUserProjects(response.data.projects);
      setLoading(false);
    } catch (error) {
      console.error("Error retrieving user projects:", error);
      setError("Error retrieving user projects. Please try again later.");
      setLoading(false);
    }
  }


  const handleApprove = async (Empid,projectName) => {
    console.log(Empid)
    try {
      const response = await axios.post(
        "http://localhost:5000/profile/approveProject",
        { Empid, command: "Approve" ,projectName}
      );
      if (response.status === 200) {
        alert("Approved");
        fetchProjects(Email);
      }
    } catch (error) {
      console.error("Error approving certificate:", error);
      setError("Error approving certificate. Please try again later.");
    }
  };

  const handleReject = async (Empid,projectName) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/profile/approveProject",
        { Empid, command: "Reject" ,projectName}
      );
      if (response.status === 200) {
        alert("Rejected");
        fetchProjects(Email);
      }
    } catch (error) {
      console.error("Error rejecting certificate:", error);
      setError("Error rejecting certificate. Please try again later.");
    }
  };


  return (
    <div style={{display:'flex'}}>
      <UserSidebar />

      <div className="container mt-5">
  <h3 className="mb-4" style={{ fontFamily: "monospace", fontWeight: "bolder" }}>
     Project Experiences For Approval
  </h3>
  {loading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>{error}</p>
  ) : userProjects.filter((item) => item.Status === "Pending").length > 0 ? (
    <div className="table-responsive">
      <table className="table" style={{ }}>
        <thead>
          <tr style={{ height: "60px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
          <th>Employee ID</th>
            <th scope="col">Project Name</th>
            <th scope="col">Description</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Role</th>
            <th>Status</th>
            <th>Approve</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {userProjects.filter((item) => item.Status === "Pending").map((item) => (
            <tr key={item._id} style={{ height: "60px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
              <td>{item.Empid ? item.Empid : ""}</td>
              <td>{item.projectName ? item.projectName.toUpperCase() : ""}</td>
              <td>{item.description ? item.description.toUpperCase() : ""}</td>
              <td>{new Date(item.startDate).toLocaleDateString('en-US')}</td>
              <td>{new Date(item.endDate).toLocaleDateString('en-US')}</td>
              <td>{item.role ? item.role.toUpperCase() : ""}</td>
              <td>{item.status ? item.status.toUpperCase() : ""}</td>
              <td><button type="button" className="btn btn-primary btn-block"onClick={() => handleApprove(item.Empid,item.projectName)}>
                  Approve</button>
              </td>
              <td><button type="button" className="btn btn-primary btn-block" onClick={() => handleReject(item.Empid,item.projectName)}>
                 Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p>No Project Experiences To Show</p>
  )}
</div>


    </div>
  );
}

export default ProjectExperence;
