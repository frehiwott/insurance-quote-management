import express from "express";

import {
  createQuestionOption,
  deleteQuestionOption,
  getQuestionOption,
  getQuestionOptions,
  updateQuestionOption,
  getQuestionOptionsByparentId,
} from "../controllers/questionOption.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE

/**
 * @swagger
 * /api/questionOptions:
 *   post:
 *     tags:
 *       - QuestionOption
 *     requestBody:
 *       description: A JSON object containing question options information
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              name:
 *               type: string
 *              parentQuestion:
 *               type: string
 *              nextQuestion:
 *               type: string
 *
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", createQuestionOption);

//UPDATE
router.put("/:id", updateQuestionOption);

//DELETE
router.delete("/:id", deleteQuestionOption);

/**
 * @swagger
 * /api/questionOptions/byParent/{id}:
 *   get:
 *     description: All QuestionOptions by parent question
 *     tags:
 *       - QuestionOption
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Returns all the QuestionOptions by parent question
 */
router.get("/byParent/:id", getQuestionOptionsByparentId);

//GET
router.get("/:id", getQuestionOption);

//GET ALL
/**
 * @swagger
 * /api/questionOptions:
 *   get:
 *     description: All QuestionOptions
 *     tags:
 *       - QuestionOption
 *     responses:
 *       200:
 *         description: Returns all the QuestionOptions
 */
router.get("/", getQuestionOptions);

export default router;
