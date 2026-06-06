import express from "express";
import db from "../config/database.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/summary", authMiddleware, roleMiddleware("admin", "super_admin"), async (req, res) => {
  const [[books]] = await db.execute("SELECT COUNT(*) AS total_books FROM books");
  const [[users]] = await db.execute("SELECT COUNT(*) AS total_members FROM users");
  const [[borrowed]] = await db.execute(
    "SELECT COUNT(*) AS borrowed_books FROM borrow_records WHERE status = 'borrowed'"
  );
  const [[overdue]] = await db.execute(
    "SELECT COUNT(*) AS overdue_books FROM borrow_records WHERE status = 'overdue'"
  );

  res.json({
    total_books: books.total_books,
    total_members: users.total_members,
    borrowed_books: borrowed.borrowed_books,
    overdue_books: overdue.overdue_books
  });
});

export default router;
