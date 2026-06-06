import express from "express";
import db from "../config/database.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, roleMiddleware("super_admin"), async (req, res) => {
  const [settings] = await db.execute("SELECT * FROM system_settings ORDER BY setting_name ASC");
  res.json(settings);
});

export default router;
