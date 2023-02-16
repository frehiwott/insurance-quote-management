import express from "express";

import {
  createUserType,
  deleteUserType,
  getUserType,
  getUserTypes,
  updateUserType,
  getUserTypeByName,
} from "../controllers/user-type.controller";
const router = express.Router();

//CREATE

/**
 * @swagger
 * /api/userTypes:
 *   post:
 *     tags:
 *       - UserType
 *     requestBody:
 *       description: A JSON object containing question options information
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              name:
 *               type: string
 *              type:
 *               type: string
 *              description:
 *               type: string
 *
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", createUserType);

//UPDATE
router.put("/:id", updateUserType);

//DELETE
router.delete("/:id", deleteUserType);

/**
 * @swagger
 * /api/userTypes/byType/{type}:
 *   get:
 *     description: fetch user types using type key
 *     tags:
 *       - UserType
 *     parameters:
 *       - in: path
 *         name: type
 *         schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Returns question
 */
router.get("/byType/:type", getUserTypeByName);

//GET
router.get("/:id", getUserType);

//GET ALL
/**
 * @swagger
 * /api/userTypes:
 *   get:
 *     description: All UserTypes
 *     tags:
 *       - UserType
 *     responses:
 *       200:
 *         description: Returns all the UserTypes
 */
router.get("/", getUserTypes);

export default router;
