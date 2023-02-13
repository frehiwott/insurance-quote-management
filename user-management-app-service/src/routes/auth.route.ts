import express from "express";

import {
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
