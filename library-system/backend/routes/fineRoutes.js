import express from "express";
import db from "../config/database.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const [fines] = await db.execute(
    `SELECT fines.*, users.full_name
     FROM fines
     JOIN users ON users.id = fines.user_id
     ORDER BY fines.created_at DESC`
  );

  res.json(fines);
});

export default router;
