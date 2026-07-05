import express from "express";
import validateBody from "../middleware/validateBody.js";
import consultationSchema from "../validators/consultationValidator.js";
import { submitConsultation } from "../controllers/consultationController.js";

const router = express.Router();

router.post("/", validateBody(consultationSchema), submitConsultation);

export default router;