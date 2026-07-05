import express from "express";
import {submitConsultation} from "../controllers/consultationController.js";

const router = express.Router();

router.post("/", submitConsultation);

export default router;