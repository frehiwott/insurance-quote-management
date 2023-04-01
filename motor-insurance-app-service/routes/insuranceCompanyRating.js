import express from "express";

import {
  createInsuranceCompanyRating,
  createInsuranceCompanyRatings,
  deleteInsuranceCompanyRating,
  getInsuranceCompanyRating,
  getInsuranceCompanyRatings,
  getInsuranceCompanyRatingsByCompany,
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

/**
 * @swagger
 * /api/insuranceCompanyRating/all:
 *   post:
 *     tags:
 *       - InsuranceCompanyRating
 *     requestBody:
 *       description: A JSON object containing Insurance Company Rating information
 *       content:
 *         application/json:
 *           schema:
 *            type: array
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
router.post("/all", createInsuranceCompanyRatings);

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

/**
 * @swagger
 * /api/insuranceCompanyRating/byCompany/{id}:
 *   get:
 *     description: All rate
 *     tags:
 *       - InsuranceCompanyRating
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Returns rate based on company
 */
router.get("/byCompany/:id", getInsuranceCompanyRatingsByCompany);

export default router;
