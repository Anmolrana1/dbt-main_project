const mongoose = require("mongoose");
const userDetailsSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  LastName: String,
  Email: { type: String, unique: true, required: true },
  phone: { type: Number, required: true },
  Empid: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Designation: { type: String, required: true },
  DOJ: { type: String, required: true },
  Role: { type: String, required: true }
});

const UserDetails = mongoose.model("UserDetails", userDetailsSchema);
exports.modules = { UserDetails };
