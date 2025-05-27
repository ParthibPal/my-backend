const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require("./routes/authRoutes");  //importing authRoutes

const app = express(); //creating express app
app.use(cors({
  origin: "https://parthibpal.github.io", // Allow frontend domain
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));
    //enable cors for all routes
app.use(express.json());    //parse incoming JSON requests

//routes
app.use("/api/auth", authRoutes);   //all auth routes under /api/auth

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected 🚀");
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });
