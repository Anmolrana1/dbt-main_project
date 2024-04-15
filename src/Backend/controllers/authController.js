const UserDetails = require("../Models/modelUserDetails").modules.UserDetails;
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken"); // Adding JWT tokens

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

async function signup(req, res) {
  try {
    const {
      FirstName,
      LastName,
      Email,
      phone,
      Empid,
      Password,
      Designation,
      DOJ,
      Role,
    } = req.body;

    const user = await UserDetails.findOne({ Email: Email });
    if (user) {console.log("email exist");
      return res.status(404).json({ error: "Email already exists" });
    }
    const user1 = await UserDetails.findOne({ Empid: Empid });
    if (user1) {console.log("id exist");
    console.log("232")
    return res.status(404).json({ error: "Empid already exists" });
    
  }
    const userDetails = new UserDetails({
      FirstName,
      LastName,
      Email,
      phone,
      Empid,
      Password,
      Designation,
      DOJ,
      Role,
    });
    await userDetails.save();
    // Generate JWT token
    const token = jwt.sign({ Password: Password,email:Email }, 'secretkey', { expiresIn: '1h' });
    // Send signup confirmation email
    const resetLink = `http://localhost:3000/ResetPassword?token=${token}`;
    const mailOptions = {
      from: "anmolrana.cs19@gmail.com",
      to: "anmolrana.cs19@gmail.com",
      subject: "Welcome to our platform",
      text: `${FirstName}, welcome to our platform! You can reset your password using ${Password}. ${resetLink}`,
    };
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Signup successful", token: token });
  } catch (error) {
    console.error("Error signing up:", error);
    return res.status(500).json({ error: "Server error" });
  }
}


//login
async function login(req, res) {
  try {
    const { Email,Password } = req.body;
    const user = await UserDetails.findOne({ Email: Email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if(user.Password!==Password){
      return res.status(201).json({ error: "incorrect password" });
    }

    let role = "";
    if (user.Role === "Admin") {
      role = "Admin";
    } else if (user.Role === "User") {
      role = "User";
    }
    else if (user.Role === "Approver") {
      role = "Approver";
    }

    // Generate JWT token
    const token = jwt.sign({ email: Email }, "secret_key");

    // Return a structured response with the user's role and token
    res.status(200).json({ role: role, token: token });
  } catch (error) {
    console.error("Error getting user details:", error);
    return res.status(500).json({ error: "Server error" });
  }
}



async function sendResetMail(req, res) {
  try {
    const { FirstName, Email } = req.body;
    const user = await UserDetails.findOne({ Email: Email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.Email }, 'secretkey', { expiresIn: '1h' });

    // Include token in reset link
    const resetLink = `http://localhost:3000/Reset?token=${token}`;

    // Rest of the code remains the same
    const mailOptions = {
      from: "anmolrana.cs19@gmail.com",
      to: "anmolrana.cs19@gmail.com",
      subject: "Reset Your Password",
      text: `Hello ${FirstName},\n\n`
        + "You are receiving this email because you (or someone else) has requested to reset the password for your account.\n\n"
        + `Please click on the following link to complete the process:\n\n`
        + `${resetLink}\n\n`
        + "If you did not request this, please ignore this email and your password will remain unchanged.\n",
    };
    
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

async function ForgotPassword(req, res) {
  try {
    const { token, Password } = req.body;

    // Verify JWT token
    const decoded = jwt.verify(token, 'secretkey');
    const userEmail = decoded.email;

    // Find user by email
    const user = await UserDetails.findOne({ Email: userEmail });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (Password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters long" });
    }
    // Update the user's password
    user.Password = Password;
    await user.save();
    console.log(user)
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ error: "Server error" });
  }
}


module.exports = {
  signup,
  login, ForgotPassword,sendResetMail, 
};
