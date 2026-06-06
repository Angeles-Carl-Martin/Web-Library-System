import express from "express";
import bcrypt from "bcryptjs";
import db from "../config/database.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, roleMiddleware("super_admin"), async (req, res) => {
  const [staff] = await db.execute(
    `SELECT id, full_name, email, role, status, contact_number, created_by, created_at
     FROM staff
     ORDER BY created_at DESC`
  );

  res.json(staff);
});

router.post("/", authMiddleware, roleMiddleware("super_admin"), async (req, res) => {
  const { full_name, email, password, role, contact_number } = req.body;

  if (!full_name || !email || !password) {
    return res.status(400).json({ message: "Full name, email, and password are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await db.execute(
    `INSERT INTO staff (full_name, email, password, role, contact_number, created_by)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [full_name, email, hashedPassword, role || "admin", contact_number || null, req.auth.id]
  );

  res.status(201).json({ message: "Staff account created", staff_id: result.insertId });
});

export default router;
