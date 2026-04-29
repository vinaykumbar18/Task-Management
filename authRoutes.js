const express = require("express");
const router = express.Router();

const {
    signup,
    login,
    profile
} = require("../controllers/authController");

const verifyToken = require("../middleware/verifyToken");


// Signup
router.post("/signup", signup);

// Login
router.post("/login", login);

// Protected Route
router.get("/profile", verifyToken, profile);

module.exports = router;