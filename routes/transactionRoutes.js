import express from "express";
import { getJobs, getJobsById } from "../controllers/applicantController.js";
import { verifyToken, applicantOnly } from "../middleware/authUser.js";

const router = express.Router();

router.get("/vacancies", verifyToken, applicantOnly, getJobs);
router.get("/vacancies/:id", verifyToken, applicantOnly, getJobsById);

export default router;
