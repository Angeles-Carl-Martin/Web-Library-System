import express from "express";
import db from "../config/database.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const [authors] = await db.execute("SELECT * FROM authors ORDER BY name ASC");
  res.json(authors);
});

router.post("/", authMiddleware, roleMiddleware("admin", "super_admin"), async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Author name is required" });
  }

  const [result] = await db.execute("INSERT INTO authors (name) VALUES (?)", [name]);
  res.status(201).json({ message: "Author created", author_id: result.insertId });
});

export default router;
