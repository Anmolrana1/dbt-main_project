
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,

} from "@mui/material";

import "../user/UserNavbar";
import FitbitIcon from '@mui/icons-material/Fitbit';
import { Link } from "react-router-dom";


function LoginSignupNavbar() {
 
  return (
    <AppBar position="static" className="p-2" style={{backgroundColor:"rgb(50, 50,150)"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters style={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
          <FitbitIcon sx={{ display: { xs: "none", md: "flex" ,fontSize:'xxx-large'}, mr: 2 }} />
            <Link to='/'  style={{ textDecoration: "none" }}>
            <Typography
              className="menu"
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "2rem",
                color:"white"
              }}
            >
              SkillMatrix
            </Typography>
            </Link>
            </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default LoginSignupNavbar;
