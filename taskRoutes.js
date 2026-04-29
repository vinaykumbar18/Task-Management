const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");

const {
    createTask,
    getUserTasks,
    updateTaskStatus,
    deleteTask
} = require("../controllers/taskController");

/* =========================
   Protected Routes
========================= */

// View logged in user's tasks
router.get("/", verifyToken, getUserTasks);

// Create task
router.post("/create", verifyToken, createTask);

// Update task status
router.put("/update/:id", verifyToken, updateTaskStatus);

// Delete task
router.delete("/delete/:id", verifyToken, deleteTask);

module.exports = router;