import express from "express";

import {
  createQuestion,
  deleteQuestion,
  getQuestion,
  getQuestions,
  updateQuestion,
  getTheFirstQuestion,
  getTheFirstQuestionByInsuranceType,
} from "../controllers/newQuestion.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE

/**
 * @swagger
 * /api/newQuestions:
 *   post:
 *     tags:
 *       - NewQuestion
 *     requestBody:
 *       description: A JSON object containing question information
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              name:
 *               type: string
 *              controlType:
 *               type: string
 *              description:
 *               type: string
 *              btnNext:
 *               type: boolean
 *              insuranceType:
 *               type: string
 *
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", createQuestion);

//UPDATE
router.put("/:id", updateQuestion);

//DELETE
router.delete("/:id", deleteQuestion);

/**
 * @swagger
 * /api/newQuestions/first:
 *   get:
 *     description: All first questions
 *     tags:
 *       - NewQuestion
 *     responses:
 *       200:
 *         description: Returns  the first question
 */
router.get("/first", getTheFirstQuestion);

/**
 * @swagger
 * /api/newQuestions/first/{insuranceType}:
 *   get:
 *     description: All first questions
 *     tags:
 *       - NewQuestion
 *     parameters:
 *       - in: path
 *         name: insuranceType
 *         schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Returns  the first question
 */
router.get("/first/:insuranceType", getTheFirstQuestionByInsuranceType);

/**
 * @swagger
 * /api/newQuestions/{id}:
 *   get:
 *     description: fetch  question by id
 *     tags:
 *       - NewQuestion
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Returns question
 */
router.get("/:id", getQuestion);

//GET ALL
/**
 * @swagger
 * /api/newQuestions:
 *   get:
 *     description: All questions
 *     tags:
 *       - NewQuestion
 *     responses:
 *       200:
 *         description: Returns all the questions
 */
router.get("/", getQuestions);

export default router;
