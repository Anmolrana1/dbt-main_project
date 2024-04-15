import React, { useEffect, useState } from "react";
import axios from "axios";
import { Paper, Typography, Grid, Avatar } from "@mui/material";
import { Container } from "react-bootstrap";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UserSidebar from "./UserSidebar";

function UserDashBoard({ isLoggedIn }) {
  const [Email, setEmail] = useState("");
  const [userData, setUserData] = useState({});
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false)

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(
          "http://localhost:5000/profile/userprofile",
          { Email }
        );
        console.log(response.data.user); // Logging the user data
        setUserData(response.data.user);
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    }

    if (Email !== "") {
      fetchData();
    }
  }, [Email]);

  const handleEdit = () => {
    setIsEditPopupOpen(true);
  };

  return (
    <div
      style={{
        backgroundColor: "rgb(220, 220, 220)",
        height: "100vh",
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <UserSidebar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          flexDirection: "column",
        }}
      >
        <Paper
          elevation={3}
          style={{
            width: "50%",
            padding: "2rem",
            borderRadius: "2rem",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
          className="mt-2"
        >
          <div>
            <Grid
              item
              xs={12}
              md={4}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  backgroundColor: "rgb(50, 50, 150)",
                }}
              >
                <AccountCircleIcon sx={{ width: 100, height: 100 }} />
              </Avatar>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                style={{ marginTop: "2rem", fontWeight: "bolder" }}
              >
                USER PROFILE
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Container className="mt-4 d-flex justify-content-center">
                <table className=" table ">
                  <tbody>
                    <tr>
                      <td>
                        <strong>First Name:</strong>
                      </td>
                      <td>{userData.FirstName?.toUpperCase()}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Last Name:</strong>
                      </td>
                      <td>{userData.LastName?.toUpperCase()}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Designation:</strong>
                      </td>
                      <td>{userData.Designation?.toUpperCase()}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>EmpID:</strong>
                      </td>
                      <td>{userData.Empid}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Email:</strong>
                      </td>
                      <td>{userData.Email?.toUpperCase()}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Phone:</strong>
                      </td>
                      <td>{userData.phone}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>DOJ:</strong>
                      </td>
                      <td>{userData.DOJ}</td>
                    </tr>
                  </tbody>
                </table>
              </Container>
            </Grid>{" "}
            <button type="submit" onClick={handleEdit} className="btn btn-primary btn-block mt-4">
                Edit profile
              </button>
          </div>
        </Paper>
      </div>
      {isEditPopupOpen && (
        <EditUserPopup
          userData={userData}
          handleClose={() => setIsEditPopupOpen(false)}
        />
      )}
    </div>
  );
}


//popup window
const EditUserPopup = ({ userData, handleClose }) => {
  const [editedUserData, setEditedUserData] = useState({
    FirstName: userData.FirstName,
    LastName: userData.LastName,
    Designation: userData.Designation,
    Empid: userData.Empid,
    Email: userData.Email,
    phone: userData.phone,
    DOJ: userData.DOJ,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // Validate email address using regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(editedUserData.Email)) {
      alert("Invalid email address!");
      return;
    }
  
    try {
      // Send editedUserData to the server to update user details
      const response = await axios.put("http://localhost:5000/profile/updateUserProfile", editedUserData);
      
      // Check if the update was successful
      if (response.status === 200) {
        alert("User's profile updated successfully"); 
        handleClose(); // Close the modal or popup
      } else {
        console.error("Error updating user details:", response.data);
      }
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };
  

  return (
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
        
      }}
    >
      <Paper
        elevation={3}
        style={{ padding: "2rem", borderRadius: "2rem", maxWidth: "600px",width:'30%' }}
      >
        <Typography variant="h6" gutterBottom>
          Edit User Details
        </Typography>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="FirstName">First Name:</label>
          <input
            type="text"
            id="FirstName"
            name="FirstName"
            value={editedUserData.FirstName}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "0.5rem",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="LastName">Last Name:</label>
          <input
            type="text"
            id="LastName"
            name="LastName"
            value={editedUserData.LastName}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "0.5rem",
              border: "1px solid #ccc",
            }}
          />
        </div>
        {/* <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="Designation">Designation:</label>
          <input
            type="text"
            id="Designation"
            name="Designation"
            value={editedUserData.Designation}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "0.5rem",
              border: "1px solid #ccc",
            }}
          />
        </div> */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="Empid">EmpID:</label>
          <input
            type="text"
            id="Empid"
            name="Empid"
            value={editedUserData.Empid}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "0.5rem",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="Email">Email:</label>
          <input
            type="email"
            id="Email"
            name="Email"
            value={editedUserData.Email}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "0.5rem",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={editedUserData.phone}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "0.5rem",
              border: "1px solid #ccc",
            }}
          />
        </div>
        {/* <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="DOJ">DOJ:</label>
          <input
            type="date"
            id="DOJ"
            name="DOJ"
            value={editedUserData.DOJ}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "0.5rem",
              border: "1px solid #ccc",
            }}
          />
        </div> */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={handleSubmit}
            style={{
              marginRight: "0.5rem",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
          <button
            onClick={handleClose}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              backgroundColor: "#6c757d",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </Paper>
    </div>
  );
};

export default UserDashBoard;
