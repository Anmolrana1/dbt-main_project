import './App.css';
import Login from './Componnents/login_signup/Login';
import Signup from './Componnents/login_signup/Signup';
import ResetPassword from './Componnents/Pages/ResetPassword';
import ChangePassword from './Componnents/Pages/ChangePassword';
import UserDashBoard from './Componnents/user/UserDashBoard';
import Certificates from './Componnents/user/Certificates';
import Skill from './Componnents/user/Skill';
import ProjectExperence from './Componnents/user/ProjectExperence';
import CertificateForApp from './Componnents/Approver/CertificateForApp';
import ProjectForApp from './Componnents/Approver/ProjectForApp';
import EmployeeDetails from './Componnents/Admin/EmployeeDetails';
import AddSkill from './Componnents/Admin/AddSkill';
import UserSidebar from './Componnents/user/UserSidebar';
import Powerbi from './Componnents/RecommendFrontEnd/Powerbi';
import EmployeeRecommendations from './Componnents/RecommendFrontEnd/Recommend';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  useEffect(() => {  
    const loggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('role');
    if (loggedIn === 'true' && userRole) {
      setIsLoggedIn(true);
      setRole(userRole);
    }

  }, [isLoggedIn,role]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/Reset" element={<ResetPassword />} />
          <Route path="/ResetPassword" element={<ChangePassword  />} />
          {isLoggedIn && (
            <>

              <Route path="/userdashboard" element={<UserDashBoard />} />
              <Route path="/Certificates" element={<Certificates />} />
              <Route path="/Skills" element={<Skill />} />
              <Route path="/ProjectExperence" element={<ProjectExperence />} />
              {(role === "Approver" || role === "Admin") && (
                <>
                  <Route path="/CertificateForApp" element={<CertificateForApp />} />
                  <Route path="/ProjectForApproval" element={<ProjectForApp />} />
                </>
              )}
              {role === "Admin" && (
                <>
                              <Route path="/Signup" element={<Signup  />} />
                  <Route path="/EmployeeDetails" element={<EmployeeDetails />} />
                  <Route path="/AddSkill" element={<AddSkill />} />
                  <Route path="/EmployeeRecommendation" element={<EmployeeRecommendations  />} />
                  <Route path="/Powerbi" element={<Powerbi  />} />
                </>
              )}
              <Route path="/UserSidebar" element={<UserSidebar />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
