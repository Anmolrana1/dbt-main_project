const express = require('express');
const mongoose = require('mongoose');


const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
const authRouter=require('./routes/authRoutes');
const userRouter=require('./routes/userRoutes');
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://Anmolrana:1234@cluster0.3mz9fpq.mongodb.net/Project', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


app.use("/auth",authRouter);
app.use("/profile",userRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


