import express from "express";
import db from "../config/database.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const [categories] = await db.execute("SELECT * FROM categories ORDER BY name ASC");
  res.json(categories);
});

router.post("/", authMiddleware, roleMiddleware("admin", "super_admin"), async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Category name is required" });
  }

  const [result] = await db.execute("INSERT INTO categories (name) VALUES (?)", [name]);
  res.status(201).json({ message: "Category created", category_id: result.insertId });
});

export default router;
