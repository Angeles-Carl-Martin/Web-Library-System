import express from "express";
import db from "../config/database.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const [reservations] = await db.execute(
    `SELECT reservations.*, users.full_name, books.title
     FROM reservations
     JOIN users ON users.id = reservations.user_id
     JOIN books ON books.id = reservations.book_id
     ORDER BY reservations.created_at DESC`
  );

  res.json(reservations);
});

export default router;
