import express from "express";

import {
  createQuestion,
  deleteQuestion,
  getQuestion,
  getQuestions,
  updateQuestion,
} from "../controllers/question.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createQuestion);

//UPDATE
router.put("/:id", verifyAdmin, updateQuestion);

//DELETE
router.delete("/:id", deleteQuestion);

//GET
router.get("/:id", getQuestion);

//GET ALL
/**
 * @swagger
 * /questions:
 *   get:
 *     tags:
 *       - Question
 *     description: All questions
 *     responses:
 *       200:
 *         description: Returns all the questions
 */
router.get("/", getQuestions);
export default router;
