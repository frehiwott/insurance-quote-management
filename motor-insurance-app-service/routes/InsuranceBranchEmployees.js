import express from "express";

import {
  createInsuranceBranchEmployees,
  deleteInsuranceBranchEmployees,
  getInsuranceBranchEmployees,
  getAllInsuranceBranchEmployees,
  updateInsuranceBranchEmployees,
  getInsuranceBranchEmployeesByparentId,
} from "../controllers/insuranceBranchEmployees.js";
const router = express.Router();

//CREATE

/**
 * @swagger
 * /api/InsuranceBranchEmployees:
 *   post:
 *     tags:
 *       - InsuranceBranchEmployees
 *     requestBody:
 *       description: A JSON object containing question options information
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              user:
 *               type: string
 *              insuranceBranch:
 *               type: string
 *              createdBy:
 *               type: string
 *
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", createInsuranceBranchEmployees);

//UPDATE
router.put("/:id", updateInsuranceBranchEmployees);

//DELETE
router.delete("/:id", deleteInsuranceBranchEmployees);

/**
 * @swagger
 * /api/InsuranceBranchEmployees/byParent/{id}:
 *   get:
 *     description: All InsuranceBranchEmployees by parent question
 *     tags:
 *       - InsuranceBranchEmployees
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Returns all the InsuranceBranchEmployees by parent question
 */
router.get("/byParent/:id", getInsuranceBranchEmployeesByparentId);

//GET
router.get("/:id", getInsuranceBranchEmployees);

//GET ALL
/**
 * @swagger
 * /api/InsuranceBranchEmployees:
 *   get:
 *     description: All InsuranceBranchEmployees
 *     tags:
 *       - InsuranceBranchEmployees
 *     responses:
 *       200:
 *         description: Returns all the InsuranceBranchEmployees
 */
router.get("/", getAllInsuranceBranchEmployees);

export default router;
