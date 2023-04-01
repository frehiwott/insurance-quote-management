import express from "express";

import {
  createInsuranceBranch,
  deleteInsuranceBranch,
  getInsuranceBranch,
  getInsuranceBranches,
  updateInsuranceBranch,
  getInsuranceBranchesByparentId,
  getInsuranceBranchesByCompany,
} from "../controllers/insuranceBranch.js";
const router = express.Router();

//CREATE

/**
 * @swagger
 * /api/InsuranceBranches:
 *   post:
 *     tags:
 *       - InsuranceBranch
 *     requestBody:
 *       description: A JSON object containing question options information
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              name:
 *               type: string
 *              insuranceCompany:
 *               type: string
 *              location:
 *               type: string
 *              createdBy:
 *               type: string
 *
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", createInsuranceBranch);

//UPDATE
router.put("/:id", updateInsuranceBranch);

//DELETE
router.delete("/:id", deleteInsuranceBranch);

/**
 * @swagger
 * /api/InsuranceBranches/byParent/{id}:
 *   get:
 *     description: All InsuranceBranches by parent question
 *     tags:
 *       - InsuranceBranch
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Returns all the InsuranceBranches by parent question
 */
router.get("/byParent/:id", getInsuranceBranchesByparentId);

/**
 * @swagger
 * /api/InsuranceBranches/byCompany/{id}:
 *   get:
 *     description: All InsuranceBranches by company 
 *     tags:
 *       - InsuranceBranch
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Returns all the InsuranceBranches by company 
 */
router.get("/byCompany/:id", getInsuranceBranchesByCompany);

//GET
router.get("/:id", getInsuranceBranch);

//GET ALL
/**
 * @swagger
 * /api/InsuranceBranches:
 *   get:
 *     description: All InsuranceBranches
 *     tags:
 *       - InsuranceBranch
 *     responses:
 *       200:
 *         description: Returns all the InsuranceBranches
 */
router.get("/", getInsuranceBranches);

export default router;
