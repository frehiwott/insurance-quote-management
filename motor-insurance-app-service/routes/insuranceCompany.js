import express from "express";

import {
  createInsuranceCompany,
  deleteInsuranceCompany,
  getInsuranceCompany,
  getInsuranceCompanys,
  updateInsuranceCompany,
} from "../controllers/insuranceCompany.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE

/**
 * @swagger
 * /api/insuranceCompany:
 *   post:
 *     tags:
 *       - InsuranceCompany
 *     requestBody:
 *       description: A JSON object containing Insurance Company information
 *       content:
 *         application/json:
 *           schema: 
 *            type: object
 *            properties:
 *              name:
 *               type: string
 *              establishedDate:
 *               type: string
 *              renewedDate:
 *               type: string
 *              type:
 *               type: string
 *              phone:
 *               type: string
 *              fax:
 *               type: string
 *              email:
 *               type: string
 *
 *     responses:
 *       201:
 *         description: Created
 */

router.post("/", createInsuranceCompany);

//UPDATE
router.put("/:id", updateInsuranceCompany);

//DELETE
router.delete("/:id", deleteInsuranceCompany);

//GET
router.get("/:id", getInsuranceCompany);

//GET ALL
/**
 * @swagger
 * /api/insuranceCompany:
 *   get:
 *     description: All InsuranceCompany
 *     tags:
 *       - InsuranceCompany
 *     responses:
 *       200:
 *         description: Returns all the InsuranceCompany
 */
router.get("/", getInsuranceCompanys);

export default router;
