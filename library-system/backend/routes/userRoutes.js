import express from "express";
import db from "../config/database.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, roleMiddleware("admin", "super_admin"), async (req, res) => {
  const [users] = await db.execute(
    `SELECT id, full_name, email, status, contact_number, member_id, member_type, department, address, created_at
     FROM users
     ORDER BY created_at DESC`
  );

  res.json(users);
});

export default router;
