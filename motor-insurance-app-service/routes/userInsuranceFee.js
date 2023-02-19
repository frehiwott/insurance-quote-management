import express from "express";

import {
  getUserInsuranceFee,
  createUserInsuranceFee,
  createNewUserInsuranceFee,
} from "../controllers/userInsuranceFee.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

/**
 * @swagger
 * /api/insuranceFee:
 *   post:
 *     tags:
 *       - InsuranceCompanyFee
 *     requestBody:
 *       description: A JSON object containing insurance fee information
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              user_type:
 *               type: string
 *              username:
 *               type: string
 *              email:
 *               type: string
 *              password:
 *               type: string
 *              profile_picture:
 *               type: string
 *              created_by:
 *               type: string
 *              roles:
 *               type: array
 *               items:
 *                 type: string
 *              model:
 *               type: string
 *              price:
 *               type: number
 *              dateOfManufacturing:
 *               type: string
 *              companyId:
 *               type: string
 *              questionId:
 *               type: string
 *
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", createUserInsuranceFee);


/**
 * @swagger
 * /api/insuranceFee/new:
 *   post:
 *     tags:
 *       - InsuranceCompanyFee
 *     requestBody:
 *       description: A JSON object containing insurance fee information
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              model:
 *               type: string
 *              price:
 *               type: number
 *              dateOfManufacturing:
 *               type: string
 *              companyId:
 *               type: string
 *              questionId:
 *               type: string
 *
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/new",verifyToken, createNewUserInsuranceFee);

/**
 * @swagger
 * /api/insuranceFee/{questionId}/{motorPrice}:
 *   get:
 *     description: fetch insurance company fee
 *     tags:
 *       - InsuranceCompanyFee
 *     parameters:
 *       - in: path
 *         name: questionId
 *         schema:
 *          type: string
 *       - in: path
 *         name: motorPrice
 *         schema:
 *          type: number
 *     responses:
 *       200:
 *         description: Returns insurance company fee
 */
router.get("/:questionId/:motorPrice", getUserInsuranceFee);

export default router;
