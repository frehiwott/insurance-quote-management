import express from "express";

import {
  handleLogin,
  handleRefreshToken,
  handleLogout,
} from "../controllers/authController.js";
const router = express.Router();

//CREATE

/**
 * @swagger
 * /api/newAuth/login:
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
 * /api/newAuth/refreshToken:
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
