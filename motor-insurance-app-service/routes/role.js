import express from "express";

import {
  createRole,
  deleteRole,
  getRole,
  getRoles,
  updateRole,
} from "../controllers/role.js";
const router = express.Router();

//CREATE

/**
 * @swagger
 * /api/roles:
 *   post:
 *     tags:
 *       - Role
 *     requestBody:
 *       description: A JSON object containing question options information
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              name:
 *               type: string
 *              description:
 *               type: string
 *
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", createRole);

//UPDATE
router.put("/:id", updateRole);

//DELETE
router.delete("/:id", deleteRole);

//GET
router.get("/:id", getRole);

//GET ALL
/**
 * @swagger
 * /api/roles:
 *   get:
 *     description: All Roles
 *     tags:
 *       - Role
 *     responses:
 *       200:
 *         description: Returns all the Roles
 */
router.get("/", getRoles);

export default router;
