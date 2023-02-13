import express from "express";

import {
  createInsuranceType,
  deleteInsuranceType,
  getInsuranceType,
  getInsuranceTypes,
  updateInsuranceType,
} from "../controllers/insuranceType.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
/**
 * @swagger
 * /api/insuranceTypes:
 *   post:
 *     tags:
 *       - InsuranceType
 *     requestBody:
 *       description: A JSON object containing Insurance Type information
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              name:
 *               type: string
 *              type:
 *               type: string
 *
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", createInsuranceType);

//UPDATE
router.put("/:id", updateInsuranceType);

//DELETE
router.delete("/:id", deleteInsuranceType);

//GET
router.get("/:id", getInsuranceType);

//GET ALL
/**
 * @swagger
 * /api/insuranceTypes:
 *   get:
 *     description: All InsuranceType
 *     tags:
 *       - InsuranceType
 *
 *     responses:
 *       200:
 *         description: Returns all the InsuranceType
 */
router.get("/", getInsuranceTypes);

export default router;
