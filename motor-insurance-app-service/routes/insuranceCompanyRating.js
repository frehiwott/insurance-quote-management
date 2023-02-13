import express from "express";

import {
  createInsuranceCompanyRating,
  deleteInsuranceCompanyRating,
  getInsuranceCompanyRating,
  getInsuranceCompanyRatings,
  updateInsuranceCompanyRating,
} from "../controllers/insuranceCompanyRating.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE

/**
 * @swagger
 * /api/insuranceCompanyRating:
 *   post:
 *     tags:
 *       - InsuranceCompanyRating
 *     requestBody:
 *       description: A JSON object containing Insurance Company Rating information
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              insuranceCompany:
 *               type: string
 *              question:
 *               type: string
 *              rate:
 *               type: number
 *
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", createInsuranceCompanyRating);

//UPDATE
router.put("/:id", updateInsuranceCompanyRating);

//DELETE
router.delete("/:id", deleteInsuranceCompanyRating);

//GET
router.get("/:id", getInsuranceCompanyRating);

//GET ALL
/**
 * @swagger
 * /api/insuranceCompanyRating:
 *   get:
 *     description: All InsuranceCompanyRating
 *     tags:
 *       - InsuranceCompanyRating
 *     responses:
 *       200:
 *         description: Returns all the InsuranceCompanyRating
 */
router.get("/", getInsuranceCompanyRatings);

export default router;
