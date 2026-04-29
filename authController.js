//signup
//login
//password stored in db encrypted way
// 

// controllers/authController.js

const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



// =========================
// SIGNUP
// =========================
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check existing user
        const userCheck = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (userCheck.rows.length > 0) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // insert user
        const result = await pool.query(
            "INSERT INTO users(name, email, password) VALUES($1,$2,$3) RETURNING id,name,email",
            [name, email, hashedPassword]
        );

        res.status(201).json({
            message: "Signup successful",
            user: result.rows[0]
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};



// =========================
// LOGIN
// =========================
const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (user.rows.length === 0) {
            return res.status(400).json({
                error: "User not found"
            });
        }

        const validPassword = await bcrypt.compare(
            password,
            user.rows[0].password
        );

        if (!validPassword) {
            return res.status(400).json({
                error: "Invalid password"
            });
        }

        const token = jwt.sign(
            {
                id: user.rows[0].id
            },
            "secretkey",
            {
                expiresIn: "1h"
            }
        );

        res.json({
            message: "Login Successful",
            token: token
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


// =========================
// PROTECTED ROUTE EXAMPLE
// =========================
const profile = async (req, res) => {
    res.json({
        message: "Protected route accessed",
        user: req.user
    });
};



// =========================
// EXPORT
// =========================
module.exports = {
    signup,
    login,
    profile
};