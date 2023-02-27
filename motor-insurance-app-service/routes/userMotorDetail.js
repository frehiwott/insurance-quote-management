import express from "express";

import {
  createUserMotorDetail,
  deleteUserMotorDetail,
  getUserMotorDetail,
  getUserMotorDetails,
  updateUserMotorDetail,
} from "../controllers/userMotorDetail.js";
const router = express.Router();

//CREATE

/**
 * @swagger
 * /api/userMotorDetails:
 *   post:
 *     tags:
 *       - UserMotorDetail
 *     requestBody:
 *       description: A JSON object containing question options information
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              model:
 *               type: string
 *              dateOfManufacturing:
 *               type: string
 *              price:
 *               type: number
 *
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", createUserMotorDetail);

//UPDATE
router.put("/:id", updateUserMotorDetail);

//DELETE
router.delete("/:id", deleteUserMotorDetail);



//GET
router.get("/:id", getUserMotorDetail);

//GET ALL
/**
 * @swagger
 * /api/userMotorDetails:
 *   get:
 *     description: All UserMotorDetails
 *     tags:
 *       - UserMotorDetail
 *     responses:
 *       200:
 *         description: Returns all the UserMotorDetails
 */
router.get("/", getUserMotorDetails);

export default router;
