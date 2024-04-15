import React, { useEffect, useState } from "react";
import UserSidebar from "./UserSidebar";
import axios from "axios";

function ProjectExperence() {


  const [projectDetails, setProjectDetails] = useState({
    Email: "",
    projectName: "",
    projectType: "",
    Tech_stack: [],
    startDate: "",
    endDate: "",
    role: "",
    Status: "",
  });

  const [Email, setEmail] = useState("");
  const [userProjects, setUserProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [skill, setSkill] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const email = localStorage.getItem("email");
      setEmail(email);
      setProjectDetails((prev) => ({
        ...prev,
        Email: email,
        Status: "Pending",
      }));

      try {
        const [projectsResponse, skillResponse] = await Promise.all([
          axios.post("http://localhost:5000/profile/getProjectExperiences", { Email: email }),
          axios.post("http://localhost:5000/profile/getAddedSkill"),
        ]);

        setUserProjects(projectsResponse.data.projects);
        setSkill(skillResponse.data.skill);
        setLoading(false);
      } catch (error) {
        console.error("Error retrieving data:", error);
        setError("Error retrieving data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e, fieldName) => {
    const value = e.target.value;

    if (fieldName === "Tech_stack") {
      const updatedTechStack = [...projectDetails.Tech_stack];
      const index = updatedTechStack.indexOf(value);

      if (index === -1) {
        updatedTechStack.push(value);
      } else {
        updatedTechStack.splice(index, 1);
      }

      setProjectDetails((prev) => ({
        ...prev,
        Tech_stack: updatedTechStack,
      }));
    } else {
      setProjectDetails((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!projectDetails.projectName) {
      alert("Please fill in project Name");
      return;
    }
    if (projectDetails.startDate > projectDetails.endDate) {
      alert("Please fill correct end date");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/profile/addProjectExperience",
        projectDetails
      );

      if (response.status === 200) {
        alert("Project experience added successfully");

        const updatedResponse = await axios.post(
          "http://localhost:5000/profile/getProjectExperiences",
          { Email }
        );

        setUserProjects(updatedResponse.data.projects);
        setProjectDetails({
          Email: "",
          projectName: "",
          projectType: "",
          Tech_stack: [],
          startDate: "",
          endDate: "",
          role: "",
          Status: "",
        });
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Project already exists or there was an issue adding the project");
    }
  };

  return (
    <div style={{display:'flex'}}>
      <UserSidebar />
      <div style={{display:'flex',alignItems:'center',flexDirection:'column',justifyContent:'center',width:'100%',minHeight:'100vh',marginLeft:'1rem'}}>
      <div className="container mt-4 p-4" style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", borderRadius: "2rem" }}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form className="custom-form mt-4" onSubmit={handleSubmit}>
              <h2 className="mb-4" style={{
            fontWeight: "bold",
            color: "#333",
            marginBottom: "20px",
            margin: "2rem",
            textDecoration: "underline",
          }}>Add Project Experience</h2>
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Project Name:</td>
                    <td>
                      <input type="text" className="form-control" id="projectName" value={projectDetails.projectName} onChange={(e) => handleChange(e, "projectName")} placeholder="Enter project name" />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Tech_stack:</td>
                    <td>
                      <select className="form-select" id="skillName" onChange={(e) => handleChange(e, "Tech_stack")} value={projectDetails.Tech_stack}>
                        <option value="">Select Technologies...</option>
                        {skill.map((item, index) => (
                          <option value={item.skillName} key={index}>
                            {item.skillName}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      {projectDetails.Tech_stack.map((tech, index) => (
                        <span key={index} className="badge bg-secondary mr-2" style={{ marginRight: "0.5rem" }}>{tech}</span>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Start Date:</td>
                    <td>
                      <input type="date" className="form-control" id="startDate" value={projectDetails.startDate} onChange={(e) => handleChange(e, "startDate")} />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>End Date:</td>
                    <td>
                      <input type="date" className="form-control" id="endDate" value={projectDetails.endDate} onChange={(e) => handleChange(e, "endDate")} />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Project Type:</td>
                    <td>
                      <select className="form-select" id="role" onChange={(e) => handleChange(e, "projectType")} value={projectDetails.projectType}>
                        <option value="">Select project type</option>
                        <option value="Data Analysis">Data Analysis</option>
                        <option value="Data Visualization">Data Visualization</option>
                        <option value="Data Mining">Data Mining</option>
                        <option value="Big Data">Big Data</option>
                        <option value="Business Intelligence">Business Intelligence</option>
                        <option value="Predictive Analytics">Predictive Analytics</option>
                        <option value="Machine Learning">Machine Learning</option>
                        <option value="Natural Language Processing">Natural Language Processing</option>
                        <option value="Deep Learning">Deep Learning</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Role:</td>
                    <td>
                      <input type="text" className="form-control" id="role" value={projectDetails.role} onChange={(e) => handleChange(e, "role")} placeholder="Enter your role in the project" />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button type="submit" className="btn btn-primary btn-block mt-4">Add Project Experience</button>
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
          }}>Your Project Experiences</h3>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : userProjects.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead style={{ backgroundColor: "rgb(50, 50, 150)" }}>
                <tr style={{ height: "60px", textAlign: "center" }}>
                  <th scope="col">Project Name</th>
                  <th scope="col">Tech_stack</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">End Date</th>
                  <th scope="col">Role</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {userProjects.map((items) => (
                  <tr key={items._id} style={{ height: "60px" }}>
                    <td>{items.projectName ? items.projectName.toUpperCase() : ""}</td>
                    <td>{items.Tech_stack ? items.Tech_stack:" "}</td>
                    <td>{new Date(items.startDate).toLocaleDateString("en-US")}</td>
                    <td>{new Date(items.endDate).toLocaleDateString("en-US")}</td>
                    <td>{items.role ? items.role.toUpperCase() : ""}</td>
                    <td>{items.Status ? items.Status.toUpperCase() : ""}</td>
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
    </div>
  );
}

export default ProjectExperence;
