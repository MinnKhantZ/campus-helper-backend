import express from "express";
import {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent
} from "../controllers/Event.js";
import { authMiddleware } from "../services/auth.js";

const router = express.Router();

// Authenticated users can create; update/delete permission checked in controller
router.post("/", authMiddleware(), createEvent);
router.get("/", getEvents);
router.put("/:id", authMiddleware(), updateEvent);
router.delete("/:id", authMiddleware(), deleteEvent);

export default router;