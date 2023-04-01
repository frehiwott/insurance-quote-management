import { getUserByCompany, getUserByCreator } from "./../controllers/user.controller";
import express from "express";

import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller";
const router = express.Router();

//CREATE

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *       - User
 *     requestBody:
 *       description: A JSON object containing userinformation
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
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
 *              role:
 *               type: string
 *              insuranceCompany:
 *               type: string
 *              is_active:
 *               type: boolean

 *
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", createUser);

//UPDATE
router.put("/:id", updateUser);

//DELETE
router.delete("/:id", deleteUser);

//GET
router.get("/:id", getUser);

//GET ALL
/**
 * @swagger
 * /api/users:
 *   get:
 *     description: All Users
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Returns all the Users
 */
router.get("/", getUsers);

/**
 * @swagger
 * /api/users/createdBy/{createdBy}:
 *   get:
 *     description: All user by the creator
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: createdBy
 *         schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Returns all the users
 */
router.get("/createdBy/:createdBy", getUserByCreator);


/**
 * @swagger
 * /api/users/byCompany/{id}:
 *   get:
 *     description: All user by the company
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Returns all the users
 */
router.get("/byCompany/:id", getUserByCompany);

export default router;
