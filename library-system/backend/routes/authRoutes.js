import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/database.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const {
    full_name,
    email,
    password,
    contact_number,
    member_id,
    member_type,
    department,
    address
  } = req.body;

  if (!full_name || !email || !password) {
    return res.status(400).json({ message: "Full name, email, and password are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [result] = await db.execute(
      `INSERT INTO users
        (full_name, email, password, contact_number, member_id, member_type, department, address)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        full_name,
        email,
        hashedPassword,
        contact_number || null,
        member_id || null,
        member_type || "student",
        department || null,
        address || null
      ]
    );

    res.status(201).json({ message: "Registration successful", user_id: result.insertId });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Email or member ID already exists" });
    }

    res.status(500).json({ message: "Registration failed" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password, account_type } = req.body;
  const table = account_type === "staff" ? "staff" : "users";

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const [rows] = await db.execute(`SELECT * FROM ${table} WHERE email = ? LIMIT 1`, [email]);
  const account = rows[0];

  if (!account || !(await bcrypt.compare(password, account.password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  if (account.status !== "active") {
    return res.status(403).json({ message: "Account is not active" });
  }

  const role = table === "staff" ? account.role : "member";
  const token = jwt.sign(
    {
      id: account.id,
      role,
      account_type: table
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    token,
    user: {
      id: account.id,
      full_name: account.full_name,
      email: account.email,
      role,
      account_type: table
    }
  });
});

export default router;
