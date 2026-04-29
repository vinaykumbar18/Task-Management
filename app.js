const express = require("express");
const cors = require("cors");

const app = express();

/* =========================
   Import Routes
========================= */
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

/* =========================
   Middlewares
========================= */

// Enable CORS for frontend (React / Vite)
app.use(cors());

// Read JSON body data
app.use(express.json());

/* =========================
   Test Route
========================= */
app.get("/", (req, res) => {
    res.json({
        message: "Task Management Backend Running Successfully"
    });
});

/* =========================
   API Routes
========================= */

// Authentication Routes
app.use("/auth", authRoutes);

// User Routes
app.use("/users", userRoutes);

// Task Routes
app.use("/tasks", taskRoutes);

/* =========================
   404 Route Not Found
========================= */
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found"
    });
});

/* =========================
   Global Error Handler
========================= */
app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        error: "Internal Server Error"
    });
});

/* =========================
   Server Start
========================= */
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});