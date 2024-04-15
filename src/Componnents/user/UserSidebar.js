import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
// import { Link } from "react-router-dom";
// import { useAuth } from "../AuthContext";
import './UserNavbar.css'
import LogoutIcon from "@mui/icons-material/Logout";
import FitbitIcon from "@mui/icons-material/Fitbit";
import ProfileIcon from "@mui/icons-material/AccountCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SkillsIcon from "@mui/icons-material/EmojiObjects";
import ProjectIcon from "@mui/icons-material/Work";
import ApprovalIcon from "@mui/icons-material/ThumbUp";
import ThumbUpIcon from '@mui/icons-material/ThumbUp'; // Import the RecommendIcon from Material-UI
import BarChartIcon from '@mui/icons-material/BarChart';
import CreateUserIcon from "@mui/icons-material/PersonAdd";
import EmployeeDetailIcon from "@mui/icons-material/People";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";

function UserSidebar() {
  const { logout } = useAuth();
  const [Role, setRole] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [active, setActive] = useState("");
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState("");

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const pathname = location.pathname;
    const menuItem = pathname.substring(1); 
    setActive(menuItem);
  }, [location]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();

  
    logout();
    window.location.href = "/";
  };

  return (
    <>
      <Sidebar
        collapsed={!isOpen}
        style={{
          width: "5%",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <Menu
          style={{
            backgroundColor: "rgb(50, 50, 150)",
            paddingTop: "0",
            marginTop: "0",
            minHeight: "100vh",
            height: "100%",
            textAlign: "left",
            width: "100%",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          <div
            style={{
              paddingTop: "2rem",
              paddingLeft: "0.7rem",
              borderBottom: "2px solid white",
              paddingBottom: "2rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FitbitIcon
              sx={{
                display: { xs: "none", md: "flex" },
                fontSize: "4rem",
                color: "white",
              }}
              onClick={toggleSidebar}
            />
            <h2 style={{ color: "white", marginLeft: "0.2rem" }}>SkillMatrix</h2>
          </div>
  
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Link to="/userdashboard">
              <MenuItem
                className="menuItems"
                style={{
                  backgroundColor: active === "userdashboard" ? "rgb(50, 20, 100)" : "",
              
                  paddingLeft: "1rem",
                  fontSize: "large",
                  display: "flex",
                  alignItems: "center",
                  // Update text color when hovered
                  color: hoveredItem === "userdashboard" ? "black" : "white",
                }}
                onMouseOver={() => setHoveredItem("userdashboard")}
                onMouseLeave={() => setHoveredItem("")}
              >
                <ProfileIcon sx={{ color: "white", marginRight: "1rem" }} />
                Profile
              </MenuItem>
            </Link>
            <Link to="/Certificates">
              <MenuItem
                className="menuItems"
                style={{
                  backgroundColor: active === "Certificates" ? "rgb(50, 20, 100)" : "",
               
                  paddingLeft: "1rem",
                  fontSize: "large",
                  display: "flex",
                  alignItems: "center",
                  // Update text color when hovered
                  color: hoveredItem === "Certificates" ? "black" : "white",
                }}
                onMouseEnter={() => setHoveredItem("Certificates")}
                onMouseLeave={() => setHoveredItem("")}
              >
                <CheckCircleIcon sx={{ color: "white", marginRight: "1rem" }} />
                Certificates
              </MenuItem>
            </Link>
            <Link to="/Skills">
              <MenuItem
                className="menuItems"
                style={{
                  backgroundColor: active === "Skills" ? "rgb(50, 20, 100)" : "",
                 
                  paddingLeft: "1rem",
                  fontSize: "large",
                  display: "flex",
                  alignItems: "center",
                  // Update text color when hovered
                  color: hoveredItem === "Skills" ? "black" : "white",
                }}
                onMouseEnter={() => setHoveredItem("Skills")}
                onMouseLeave={() => setHoveredItem("")}
              >
                <SkillsIcon sx={{ color: "white", marginRight: "1rem" }} />
                Skills
              </MenuItem>
            </Link>
            <Link to="/ProjectExperence">
              <MenuItem
                className="menuItems"
                style={{
                  backgroundColor: active === "ProjectExperence" ? "rgb(50, 20, 100)" : "",
               
                  paddingLeft: "1rem",
                  fontSize: "large",
                  display: "flex",
                  alignItems: "center",
                  // Update text color when hovered
                  color: hoveredItem === "ProjectExperence" ? "black" : "white",
                }}
                onMouseEnter={() => setHoveredItem("ProjectExperence")}
                onMouseLeave={() => setHoveredItem("")}
              >
                <ProjectIcon sx={{ color: "white", marginRight: "1rem" }} />
                Project Experience
              </MenuItem>
            </Link>
            {Role === "Approver" && (
              <>
                <Link to="/CertificateForApp">
                  <MenuItem
                    className="menuItems"
                    style={{
                      backgroundColor: active === "CertificateForApp" ? "rgb(50, 20, 100)" : "",
                     
                      paddingLeft: "1rem",
                      fontSize: "large",
                      display: "flex",
                      alignItems: "center",
                      // Update text color when hovered
                      color: hoveredItem === "CertificateForApp" ? "black" : "white",
                    }}
                    onMouseEnter={() => setHoveredItem("CertificateForApp")}
                    onMouseLeave={() => setHoveredItem("")}
                  >
                    <ApprovalIcon sx={{ color: "white", marginRight: "1rem" }} />
                    Certificates For Approval
                  </MenuItem>
                </Link>
                <Link to="/ProjectForApproval">
                  <MenuItem
                    className="menuItems"
                    style={{
                      backgroundColor: active === "ProjectForApproval" ? "rgb(50, 20, 100)" : "",
                      
                      paddingLeft: "1rem",
                      fontSize: "large",
                      display: "flex",
                      alignItems: "center",
                      // Update text color when hovered
                      color: hoveredItem === "ProjectForApproval" ? "black" : "white",
                    }}
                    onMouseEnter={() => setHoveredItem("ProjectForApproval")}
                    onMouseLeave={() => setHoveredItem("")}
                  >
                    <ApprovalIcon sx={{ color: "white", marginRight: "1rem" }} />
                    Projects For Approval
                  </MenuItem>
                </Link>
                <Link to="/AddSkill">
                  <MenuItem
                    className="menuItems"
                    style={{
                      backgroundColor: active === "AddSkill" ? "rgb(50, 20, 100)" : "",
                     
                      paddingLeft: "1rem",
                      fontSize: "large",
                      display: "flex",
                      alignItems: "center",
                      // Update text color when hovered
                      color: hoveredItem === "AddSkill" ? "black" : "white",
                    }}
                    onMouseEnter={() => setHoveredItem("AddSkill")}
                    onMouseLeave={() => setHoveredItem("")}
                  >
                    <SkillsIcon sx={{ color: "white", marginRight: "1rem" }} />
                    Add New Skill
                  </MenuItem>
                </Link>
              </>
            )}
            {Role === "Admin" && (
              <>
                <Link to="/signup">
                  <MenuItem
                    className="menuItems"
                    style={{
                      backgroundColor: active === "signup" ? "rgb(50, 20, 100)" : "",
                     
                      paddingLeft: "1rem",
                      fontSize: "large",
                      display: "flex",
                      alignItems: "center",
                      // Update text color when hovered
                      color: hoveredItem === "signup" ? "black" : "white",
                    }}
                    onMouseEnter={() => setHoveredItem("signup")}
                    onMouseLeave={() => setHoveredItem("")}
                  >
                    <CreateUserIcon sx={{ color: "white", marginRight: "1rem" }} />
                    Create User
                  </MenuItem>
                </Link>
                <Link to="/EmployeeDetails">
                  <MenuItem
                    className="menuItems"
                    style={{
                      backgroundColor: active === "EmployeeDetails" ? "rgb(50, 20, 100)" : "",
                      
                      paddingLeft: "1rem",
                      fontSize: "large",
                      display: "flex",
                      alignItems: "center",
                      // Update text color when hovered
                      color: hoveredItem === "EmployeeDetails" ? "black" : "white",
                    }}
                    onMouseEnter={() => setHoveredItem("EmployeeDetails")}
                    onMouseLeave={() => setHoveredItem("")}
                  >
                    <EmployeeDetailIcon sx={{ color: "white", marginRight: "1rem" }} />
                    Employee Detail
                  </MenuItem>
                </Link>
                <Link to="/EmployeeRecommendation">
                  <MenuItem
                    className="menuItems"
                    style={{
                      backgroundColor: active === "Recommend" ? "rgb(50, 20, 100)" : "",
                      
                      paddingLeft: "1rem",
                      fontSize: "large",
                      display: "flex",
                      alignItems: "center",
                      // Update text color when hovered
                      color: hoveredItem === "Recommend" ? "black" : "white",
                    }}
                    onMouseEnter={() => setHoveredItem("Recommend")}
                    onMouseLeave={() => setHoveredItem("")}
                  >
                    <ThumbUpIcon sx={{ color: "white", marginRight: "1rem" }} />
                    Recommend
                  </MenuItem>
                </Link>
                <Link to="/Powerbi">
                  <MenuItem
                    className="menuItems"
                    style={{
                      backgroundColor: active === "Powerbi" ? "rgb(50, 20, 100)" : "",
                      
                      paddingLeft: "1rem",
                      fontSize: "large",
                      display: "flex",
                      alignItems: "center",
                      color: hoveredItem === "Powerbi" ? "black" : "white",
                    }}
                    onMouseEnter={() => setHoveredItem("Powerbi")}
                    onMouseLeave={() => setHoveredItem("")}
                  >
                    <BarChartIcon sx={{ color: "white", marginRight: "1rem" }} />
                    Analytics
                  </MenuItem>
                </Link>
                
              </>
            )}
            <MenuItem
              className="menuItems"
              style={{
                color: hoveredItem === "button" ? "black" : "white",
                fontSize: "large",
                marginTop: "2rem",
              }}
              onMouseEnter={() => setHoveredItem("button")}
              onMouseLeave={() => setHoveredItem("")}
            >
              <button
                onClick={handleLogout}
                style={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  fontSize: "larger",
                  color: hoveredItem === "button" ? "black" : "white",
                  paddingRight: "3rem",
                 
                  width: "100%",
                  textTransform: "none",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={() => setHoveredItem("button")}
              onMouseLeave={() => setHoveredItem("")}
              >
              
                  <LogoutIcon  sx={{ color: "white", marginRight: "1rem" }}/>
             
                Logout
              </button>
            </MenuItem>
          </div>
        </Menu>
      </Sidebar>
    </>
  );
}
export default UserSidebar;