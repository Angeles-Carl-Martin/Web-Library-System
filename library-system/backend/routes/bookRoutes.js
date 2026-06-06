import express from "express";
import db from "../config/database.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const [books] = await db.execute(
    `SELECT
      books.*,
      authors.name AS author_name,
      categories.name AS category_name
     FROM books
     LEFT JOIN authors ON authors.id = books.author_id
     LEFT JOIN categories ON categories.id = books.category_id
     ORDER BY books.created_at DESC`
  );

  res.json(books);
});

router.get("/:id", async (req, res) => {
  const [books] = await db.execute(
    `SELECT
      books.*,
      authors.name AS author_name,
      categories.name AS category_name
     FROM books
     LEFT JOIN authors ON authors.id = books.author_id
     LEFT JOIN categories ON categories.id = books.category_id
     WHERE books.id = ?`,
    [req.params.id]
  );

  if (!books[0]) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(books[0]);
});

router.post("/", authMiddleware, roleMiddleware("admin", "super_admin"), async (req, res) => {
  const {
    title,
    author_id,
    category_id,
    isbn,
    description,
    publisher,
    publication_year,
    total_copies
  } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Book title is required" });
  }

  const copies = Number(total_copies) || 1;

  const [result] = await db.execute(
    `INSERT INTO books
      (title, author_id, category_id, isbn, description, publisher, publication_year, total_copies, available_copies)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      title,
      author_id || null,
      category_id || null,
      isbn || null,
      description || null,
      publisher || null,
      publication_year || null,
      copies,
      copies
    ]
  );

  res.status(201).json({ message: "Book created", book_id: result.insertId });
});

export default router;
