import express from "express";

import {
  createMotorInsuranceDocument,
  getMotorInsuranceDocumentById,
  getMotorInsuranceDocuments,
  getMotorInsuranceDocumentsByCompany,
} from "../controllers/motorInsuranceDocument.js";
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
 *         multipart/form-data:
 *           schema:
 *            type: object
 *            properties:
 *              motorDetailId:
 *               type: string
 *              ownershipCertificate:
 *               type: file
 *               name: ownershipCertificate
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

/**
 * @swagger
 * /api/motorInsuranceDocument:
 *   get:
 *     description: All motorInsuranceDocuments
 *     tags:
 *       - MotorInsuranceDocument
 *     responses:
 *       200:
 *         description: Returns all the motorInsuranceDocuments
 */
router.get("/", getMotorInsuranceDocuments);

/**
 * @swagger
 * /api/motorInsuranceDocument/byCompany/{id}:
 *   get:
 *     description: All motorInsuranceDocuments by parent question
 *     tags:
 *       - MotorInsuranceDocument
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Returns all the motorInsuranceDocuments by parent question
 */
router.get("/byCompany/:id", getMotorInsuranceDocumentsByCompany);

/**
 * @swagger
 * /api/motorInsuranceDocument/{id}:
 *   get:
 *     description: All motorInsuranceDocuments
 *     tags:
 *       - MotorInsuranceDocument
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Returns all the motorInsuranceDocuments
 */
router.get("/:id", getMotorInsuranceDocumentById);

export default router;
