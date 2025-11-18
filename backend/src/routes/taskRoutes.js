const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// POST /api/tasks - Create new task
router.post("/", taskController.createTask);

// GET /api/tasks - Get all tasks (with optional status filter)
router.get("/", taskController.getAllTasks);

// PATCH /api/tasks/:id - Update task status
router.patch("/:id", taskController.updateTaskStatus);

// DELETE /api/tasks/:id - Delete task
router.delete("/:id", taskController.deleteTask);

module.exports = router;
