import express from "express";
import db from "../config/database.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const [records] = await db.execute(
    `SELECT borrow_records.*, users.full_name, books.title
     FROM borrow_records
     JOIN users ON users.id = borrow_records.user_id
     JOIN books ON books.id = borrow_records.book_id
     ORDER BY borrow_records.created_at DESC`
  );

  res.json(records);
});

export default router;
