import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import "./UserNavbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import axios from "axios";
import FitbitIcon from "@mui/icons-material/Fitbit";

function UserNavbar() {
  const { isLoggedIn, logout } = useAuth();
  const [Role, setRole] = useState("");
  const [Email, setEmail] = useState("");
  useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(
          "http://localhost:5000/profile/userprofile",
          { Email }
        );
        console.log(response.data.user);
        setRole(response.data.user.Role);
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    }

    if (Email !== "") {
      fetchData();
    }
  }, [Email]);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <AppBar position="static" className="p-2" style={{ backgroundColor: "rgb(50, 50, 150)" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters style={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FitbitIcon sx={{ display: { xs: "none", md: "flex" }, mr: 2, fontSize: isMobile ? 'large' : 'xxx-large' }} />

            <Link to="/userdashboard" className="menu" style={{ textDecoration: "none", marginLeft: "2rem" }}>
              <Typography
                className="menu"
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{ fontFamily: "monospace", fontWeight: 700, textDecoration: "none" }}
              >
                Profile
              </Typography>
            </Link>

            {isMobile ? null : (
              <>
                <Link to="/Certificates" className="menu" style={{ textDecoration: "none", marginLeft: "2rem" }}>
                  <Typography
                    className="menu"
                    variant="h6"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
                    sx={{ fontFamily: "monospace", fontWeight: 700, textDecoration: "none" }}
                  >
                    Certificates
                  </Typography>
                </Link>

                <Link to="/Skills" className="menu" style={{ textDecoration: "none", marginLeft: "2rem" }}>
                  <Typography
                    className="menu"
                    variant="h6"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
                    sx={{ fontFamily: "monospace", fontWeight: 700, textDecoration: "none" }}
                  >
                    Skills
                  </Typography>
                </Link>

                <Link
                  to="/ProjectExperence"
                  className="menu"
                  style={{ textDecoration: "none", marginLeft: "2rem" }}
                >
                  <Typography
                    className="menu"
                    variant="h6"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
                    sx={{ fontFamily: "monospace", fontWeight: 700, textDecoration: "none" }}
                  >
                    Project Experience
                  </Typography>
                </Link>
              </>
            )}

            {Role === "Approver" && (
              <div>
                <Typography
                  className="menu"
                  variant="h6"
                  noWrap
                  onClick={handleClick}
                  style={{ textDecoration: "none", marginLeft: "2rem", fontFamily: "monospace", fontWeight: 700 }}
                >
                  Approval Options
                </Typography>

                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                  <MenuItem onClick={handleClose} key={1}>
                    <Link to="/CertificateForApp" style={{ textDecoration: "none", color: "inherit" }}>
                      Certificates For Approval
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose} key={2}>
                    <Link to="/ProjectForApproval" style={{ textDecoration: "none", color: "inherit" }}>
                      Projects For Approval
                    </Link>
                  </MenuItem>
                </Menu>
              </div>
            )}

            {Role === "Admin" && (
              <>
                <Link to="/signup" style={{ textDecoration: "none", color: "inherit", marginLeft: "2rem" }}>
                  <Typography
                    className="menu"
                    variant="h6"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
                    sx={{ fontFamily: "monospace", fontWeight: 700, textDecoration: "none" }}
                  >
                    Create User
                  </Typography>
                </Link>

                <Link to="/EmployeeDetails" style={{ textDecoration: "none", color: "inherit" }}>
                  <Typography
                    className="menu"
                    variant="h6"
                    noWrap
                    onClick={handleClick}
                    style={{ textDecoration: "none", marginLeft: "2rem", fontFamily: "monospace", fontWeight: 700 }}
                  >
                    Employee Detail
                  </Typography>
                </Link>
              </>
            )}
          </div>
          {!isLoggedIn && (
            <Button
              color="inherit"
              onClick={handleLogout}
              style={{
                backgroundColor: " rgb(128, 5, 5)",
                fontFamily: "monospace",
                fontWeight: 700,
                fontSize: "larger",
                border: "2px solid black",
                borderRadius: "2rem",
                padding: "5px",
                width: isMobile ? "7rem" : "9rem",
              }}
            >
              Logout
              <IconButton style={{ color: "white" }}>
                <LogoutIcon />
              </IconButton>
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default UserNavbar;
