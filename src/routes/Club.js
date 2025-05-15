import express from "express";
import { createClub, getClubs } from "../controllers/Club.js";

const router = express.Router();

router.post("/", createClub);
router.get("/", getClubs);

export default router;
