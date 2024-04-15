import React from "react";
import UserSidebar from "../user/UserSidebar";

function Powerbi() {
  return (
    <div style={{ display: "flex" }}>
    <UserSidebar />
    <div style={{ width: "80%",display:'flex',alignItems:'center', flexDirection:'column'}}>
    <h1 style={{ fontWeight: 'bold', color: '#333', marginBottom: '20px' ,margin:'2rem',textDecoration:'underline'}}>Insights Dashboard</h1>
    <iframe
  title="bi_major_project"
  width="100%"
  height="541.25"
  src="https://app.powerbi.com/reportEmbed?reportId=06852b70-0b31-4cfb-9a65-aff8ab97e5db&autoAuth=true&ctid=2800c0a0-70e9-49be-8733-faeaa6aced99&navContentPaneEnabled=false&chromeless=true&filterPaneEnabled=false&footerVisible=false"
  frameborder="0"
></iframe>
    </div>
  </div>
  )
}

export default Powerbi