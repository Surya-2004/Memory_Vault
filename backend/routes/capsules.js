// routes/capsules.js
const express = require("express");
const router = express.Router();
const {
  getCapsules,
  createCapsule,
  deleteCapsule
} = require("../controllers/capsuleController");

// Authentication middleware (define or import it here)
const authenticateUser = require("../middleware/auth");

// GET /users/capsules?status=unlocked|locked
router.get("/", authenticateUser, getCapsules);

// POST /users/capsules (create new capsule)
router.post("/", authenticateUser, createCapsule);

// DELETE /users/capsules/:id
router.delete("/:id", authenticateUser, deleteCapsule);

module.exports = router;