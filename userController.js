//create user
//delete user
//update user

const pool = require("../config/db");


// CREATE USER
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const result = await pool.query(
            "INSERT INTO users(name, email, password) VALUES($1,$2,$3) RETURNING *",
            [name, email, password]
        );

        res.status(201).json({
            message: "User created successfully",
            user: result.rows[0]
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// DELETE USER
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query(
            "DELETE FROM users WHERE id = $1",
            [id]
        );

        res.json({
            message: "User deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// UPDATE USER
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        const result = await pool.query(
            "UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *",
            [name, email, id]
        );

        res.json({
            message: "User updated successfully",
            user: result.rows[0]
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = {
    createUser,
    deleteUser,
    updateUser
};