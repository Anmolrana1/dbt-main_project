const UserDetails = require("../Models/modelUserDetails").modules.UserDetails;
const userKnowledge = require("../Models/userModel").modules.skillDetails;
const ProjectExperience = require("../Models/userModel").modules.ProjectExperience;
const Certificate = require("../Models/userModel").modules.Certificate;

const nodemailer = require("nodemailer");

// Create a transporter with custom TLS options to trust self-signed certificate
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "anmolrana.cs19@gmail.com",
    pass: "vskc ywqe emtl jibl",
  },
  tls: {
    // Necessary for self-signed certificates
    rejectUnauthorized: false,
  },
});

//userData
async function GetUser(req, res) {
  const { Email } = req.body;
  try {
    const user = await UserDetails.findOne({ Email: Email });
    if (user) {
      return res.status(200).json({ user });
    } else {
      return res.status(400).json({ error: "User does not exist" });
    }
  } catch (error) {
    console.error("Error getting user details:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

//skillData
async function setSkill(req, res) {
  console.log("here1");
  const { Email, skillName, Proficiency } = req.body;
  try {
    const user = await UserDetails.findOne({ Email: Email });
    const skillExist = await userKnowledge.findOne({
      skillName: skillName,
      Empid: user.Empid,
    });
    if (skillExist) {
      console.log("Skill already exists");
      return res.status(408).json({ error: "Skill already exists" });
    }
    if (user) {
      console.log("here");
      const upSkill = new userKnowledge({
        Empid: user.Empid,
        skillName: skillName,
        Proficiency: Proficiency,
      });
      await upSkill.save();
      return res.status(200).json({ message: "Skill added successfully" });
    }
  } catch (error) {
    console.error("Error getting user details:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

async function getSkill(req, res) {
  const { Email } = req.body;
  const userId = await UserDetails.findOne({ Email: Email });
  try {
    console.log(userId.Empid);
    
    const user = await userKnowledge.find({ Empid: userId.Empid });
    if (user) {
      return res.status(200).json({ user });
    }
  } catch (error) {
    console.error("Error getting user details:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

//project Data
async function addProjectExperience(req, res) {
  console.log("here1");
  const {
    Email,
    projectName,
    projectType,
    Tech_stack,
    startDate,
    endDate,
    role,
    Status,
  } = req.body;
  try {
    const user = await UserDetails.findOne({ Email: Email });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }
    const projectExist = await ProjectExperience.findOne({
      projectName: projectName,
      Empid: user.Empid,
    });
    if (projectExist) {
      console.log("Project already exists");
      return res.status(408).json({ error: "Project already exists" });
    }
    console.log("here");
    const newProject = new ProjectExperience({
      Empid: user.Empid,
      projectName: projectName,
      projectType: projectType,
      Tech_stack: Tech_stack,
      startDate: startDate,
      endDate: endDate,
      role: role,
      Status: Status,
    });
    await newProject.save();

    const mailOptions = {
      from: "anmolrana.cs19@gmail.com",
      to: "anmolrana.cs19@gmail.com",
      subject: "Welcome to our platform",
      text: `${user.FirstName} has added new project experience '${projectName}'. Could you kindly verify it?

        Thank you. `,
    };
    await transporter.sendMail(mailOptions);
    return res
      .status(200)
      .json({ message: "Project experience added successfully" });
  } catch (error) {
    console.error("Error adding project experience:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

async function getProjectExperiences(req, res) {
  const { Email ,command} = req.body;
  try {
    const user = await UserDetails.findOne({ Email: Email });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }
    
    if (user.Role === "Approver" && command==='yes') {
      const projects = await ProjectExperience.find();
      return res.status(200).json({ projects });

    }
      const projects = await ProjectExperience.find({ Empid: user.Empid });
      return res.status(200).json({ projects });

  } catch (error) {
    console.error("Error getting user projects:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

//certificate Data
async function addCertificate(req, res) {
  const {
    Email,
    certificateName,
    issuingOrganization,
    issueDate,
    ExpireDate,
    credentialID,
    Status,
  } = req.body;
  try {
    const user = await UserDetails.findOne({ Email: Email });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const certificateExist = await Certificate.findOne({
      certificateName: certificateName,
      issuingOrganization:issuingOrganization,
      Empid: user.Empid,
    });
    if (certificateExist) {
      console.log("Certificate already exists");
      return res.status(408).json({ error: "Certificate already exists" });
    }

    const newCertificate = new Certificate({
      Empid: user.Empid,
      certificateName: certificateName,
      issuingOrganization: issuingOrganization,
      issueDate: issueDate,
      ExpireDate: ExpireDate,
      credentialID: credentialID,
      Status: Status,
    });

    await newCertificate.save();
    const mailOptions = {
      from: "anmolrana.cs19@gmail.com",
      to: "anmolrana.cs19@gmail.com",
      subject: "Welcome to our platform",
      text: `${user.FirstName} has added new certificate  '${certificateName}'. Could you kindly verify it? 
        Thank you. `,
    };
    await transporter.sendMail(mailOptions);

    console.log("add certificate");
    return res.status(200).json({ message: "Certificate added successfully" });
  } catch (error) {
    console.error("Error adding certificate:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

async function getCertificates(req, res) {
  const { Email ,command} = req.body;
  try {
    const user = await UserDetails.findOne({ Email: Email });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }
    if (user.Role === "Approver" && command==='yes') {
      const certificates = await Certificate.find();
      const Name=user.FirstName+" "+user.LastName
      return res.status(200).json({ certificates ,Name,});
    }
    const certificates = await Certificate.find({ Empid: user.Empid });
    return res.status(200).json({ certificates });
    
    
  } catch (error) {
    console.error("Error getting user certificates:", error);
    return res.status(500).json({ error: "Server error" });
  }
}


const updateUser = async (req, res) => {
  try {
    const editedUserData = req.body;
    const Empid = editedUserData.Empid;

    // Find the user by Empid and update their details
    const updatedUser = await UserDetails.findOneAndUpdate({ Empid }, editedUserData, { new: true });

    // Check if the user exists and send the updated user data in response
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  GetUser,
  setSkill,
  getSkill,
  getProjectExperiences,
  addProjectExperience,
  addCertificate,
  getCertificates,
  updateUser
};