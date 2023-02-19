import express from "express";

import { createMotorInsuranceDocument } from "../controllers/motorInsuranceDocument.js";
import upload from "../middleware/uploadDocument.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE

/**
 * @swagger
 * /api/motorInsuranceDocument:
 *   post:
 *     tags:
 *       - MotorInsuranceDocument
 *     requestBody:
 *       description: A JSON object containing insurance document information
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              motorDetailId:
 *               type: string
 *
 *     responses:
 *       201:
 *         description: Created
 */
router.post(
  "/",
  upload.fields([
    {
      name: "ownershipCertificate",
      maxCount: 1,
    },
    {
      name: "salesAgreement",
      maxCount: 1,
    },
    {
      name: "drivingLicense",
      maxCount: 1,
    },
  ]),
  createMotorInsuranceDocument
);

export default router;
