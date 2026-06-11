const express = require("express");
const router = express.Router();

const {
    getUsers,
    getUserById,
    updateSalary,
    updateStatus,
    updateRole,
    deleteUser
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.get("/users", protect, authorize("admin", "manager"), getUsers);
router.get("/users/:id", protect, authorize("manager", "admin", "employee"), getUserById);
router.put("/users/:id/salary", protect, authorize("admin", "manager"), updateSalary);
router.put("/users/:id/role", protect, authorize("admin"), updateRole);
router.put("/users/:id/status", protect, authorize("admin", "manager"), updateStatus);
router.delete("/users/:id", protect, authorize("admin"), deleteUser);

module.exports = router;