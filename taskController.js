const pool = require("../config/db");

/* ===================================
   CREATE TASK
   Logged in user only
=================================== */
const createTask = async (req, res) => {
    try {
        const { title } = req.body;

        const userId = req.user.id;   // from JWT token

        if (!title || title.trim() === "") {
            return res.status(400).json({
                error: "Task title is required"
            });
        }

        const result = await pool.query(
            "INSERT INTO tasks(title, user_id) VALUES($1, $2) RETURNING *",
            [title, userId]
        );

        res.status(201).json({
            message: "Task created successfully",
            task: result.rows[0]
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


/* ===================================
   VIEW ONLY LOGGED IN USER TASKS
=================================== */
const getUserTasks = async (req, res) => {
    try {
        const userId = req.user.id;

        const result = await pool.query(
            "SELECT * FROM tasks WHERE user_id = $1 ORDER BY id DESC",
            [userId]
        );

        res.json({
            tasks: result.rows
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


/* ===================================
   UPDATE TASK STATUS
=================================== */
const updateTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const userId = req.user.id;

        const result = await pool.query(
            `UPDATE tasks 
             SET status = 'Completed'
             WHERE id = $1 AND user_id = $2
             RETURNING *`,
            [id, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Task not found"
            });
        }

        res.json({
            message: "Task completed",
            task: result.rows[0]
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


/* ===================================
   DELETE TASK
=================================== */
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const userId = req.user.id;

        const result = await pool.query(
            "DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *",
            [id, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Task not found"
            });
        }

        res.json({
            message: "Task deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


/* ===================================
   EXPORT
=================================== */
module.exports = {
    createTask,
    getUserTasks,
    updateTaskStatus,
    deleteTask
};