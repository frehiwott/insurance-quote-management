
import express from "express";

import {
  resetPassword,
  verifyEmail,
  verifyPhoneNumber,
  verifyUserByPhoneNumber,
  verifyUserByEmail,
  handleLogin,
  handleRefreshToken,
  handleLogout,
  
} from "../controllers/auth.controller";
const router = express.Router();

//CREATE

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: A JSON object containing auth information
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              username:
 *               type: string
 *              password:
 *               type: string
 *
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/login", handleLogin);

/**
 * @swagger
 * /api/auth/reset:
 *   post:
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: A JSON object containing reset information information
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              username:
 *               type: string
 *              password:
 *               type: string
 *              resetBy:
 *               type: string
 *
 *     responses:
 *       201:
 *         description: Updated
 */
router.post("/reset", resetPassword);

/**
 * @swagger
 * /api/auth/verifyPhoneNumber:
 *   post:
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: A JSON object containing auth information
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              phoneNumber:
 *               type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/verifyPhoneNumber", verifyPhoneNumber);

/**
 * @swagger
 * /api/auth/verifyEmail:
 *   post:
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: A JSON object containing auth information
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              email:
 *               type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/verifyEmail", verifyEmail);

/**
 * @swagger
 * /api/auth/verifyEmail/{email}:
 *   get:
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *          type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.get("/verifyEmail/:email", verifyUserByEmail);

/**
 * @swagger
 * /api/auth/logout/{id}:
 *   get:
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.get("/logout/:id", handleLogout);

/**
 * @swagger
 * /api/auth/verifyPhoneNumber/{phoneNumber}:
 *   get:
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: path
 *         name: phoneNumber
 *         schema:
 *          type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.get("/verifyPhoneNumber/:phoneNumber", verifyUserByPhoneNumber);

/**
 * @swagger
 * /api/auth/refreshToken:
 *   post:
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: A JSON object containing auth information
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              username:
 *               type: string
 *              password:
 *               type: string
 *
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/refreshToken", handleRefreshToken);

export default router;
