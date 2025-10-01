import express from "express";
import { authMiddleware } from "../services/auth.js";
import { createClub, getClubs, myClubs, requestJoin, approveJoin, getClubById, deleteClub, postAnnouncement, getAnnouncements, updateClub } from "../controllers/Club.js";
import { getClubMessages, sendClubMessage } from "../controllers/Message.js";

const router = express.Router();

router.get("/", authMiddleware(), getClubs);
router.get("/mine", authMiddleware(), myClubs);
router.get("/:id", authMiddleware(), getClubById);
router.post("/", authMiddleware(), createClub);
router.put("/:id", authMiddleware(), updateClub);
router.delete("/:id", authMiddleware(), deleteClub);

router.post("/:id/join", authMiddleware(), requestJoin);
router.post("/:id/approve", authMiddleware(), approveJoin);

router.get("/:id/announcements", authMiddleware(), getAnnouncements);
router.post("/:id/announcements", authMiddleware(), postAnnouncement);

// Club chat endpoints
router.get("/:id/messages", authMiddleware(), getClubMessages);
router.post("/:id/messages", authMiddleware(), sendClubMessage);

export default router;
