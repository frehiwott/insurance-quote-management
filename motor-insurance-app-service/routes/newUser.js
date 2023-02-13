import express from "express";

import {
  createNewUser,
  deleteNewUser,
  getNewUser,
  getNewUsers,
  updateNewUser,
} from "../controllers/newUser.js";
const router = express.Router();

//CREATE

/**
 * @swagger
 * /api/newUsers:
 *   post:
 *     tags:
 *       - NewUser
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
router.post("/", createNewUser);

//UPDATE
router.put("/:id", updateNewUser);

//DELETE
router.delete("/:id", deleteNewUser);

//GET
router.get("/:id", getNewUser);

//GET ALL
/**
 * @swagger
 * /api/newUsers:
 *   get:
 *     description: All NewUsers
 *     tags:
 *       - NewUser
 *     responses:
 *       200:
 *         description: Returns all the NewUsers
 */
router.get("/", getNewUsers);

export default router;
