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

export default router;
