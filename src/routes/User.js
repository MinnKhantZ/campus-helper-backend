import express from "express";
import { usersByIds } from "../controllers/User.js";
import { authMiddleware } from "../services/auth.js";

const router = express.Router();

router.get("/lookup", authMiddleware(), usersByIds);

export default router;
