import express from "express";

import {
  getUserInsuranceFee,
  createUserInsuranceFee,
  createNewUserInsuranceFee,
  createExistingUserInsuranceFee,
  getUserInsuranceFeeByUser,
  getAllUserInsuranceFees,
  createUserInsuranceFeeById,
} from "../controllers/userInsuranceFee.js";
import { verifyToken } from "../utils/verifyToken.js";
import upload from "../middleware/uploadDocument.js";

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
 *              phoneNumber:
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
 *              rate:
 *               type: number
 *
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", upload.single("profilePicture"), createUserInsuranceFee);

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
 *              userId:
 *               type: string
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
 *              rate:
 *               type: number
 *
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/byUserId",  upload.fields([
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
]),createUserInsuranceFeeById);

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
 *              username:
 *               type: string
 *              password:
 *               type: string
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
 *              rate:
 *               type: number
 *
 *     responses:
 *       201:
 *         description: Created
 */
router.post(
  "/forExistingUser",
  createExistingUserInsuranceFee
);

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
router.post("/new", verifyToken, createNewUserInsuranceFee);

/**
 * @swagger
 * /api/insuranceFee/byUser/{userId}:
 *   get:
 *     description: fetch insurance company fee by user
 *     tags:
 *       - InsuranceCompanyFee
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Returns insurance company fee
 */
router.get("/byUser/:userId", getUserInsuranceFeeByUser);

/**
 * @swagger
 * /api/insuranceFee/all/:
 *   get:
 *     description: fetch all insurance company requests
 *     tags:
 *       - InsuranceCompanyFee
 *     responses:
 *       200:
 *         description: Returns insurance company fee
 */
router.get("/all", getAllUserInsuranceFees);

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
