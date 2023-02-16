import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

// routes
import newQuestionsRoute from "./routes/newQuestions.js";
import questionOptionsRoute from "./routes/questionOptions.js";
import insuranceTypesRoute from "./routes/insuranceTypes.js";
import insuranceCompanyRoute from "./routes/insuranceCompany.js";
import insuranceCompanyRatingRoute from "./routes/insuranceCompanyRating.js";
import userMotorDetailRoute from "./routes/userMotorDetail.js";
import userInsuranceFeeRoute from "./routes/userInsuranceFee.js";

//
import cookieparser from "cookie-parser";
import swaggerJsDoc from "swagger-jsdoc";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./swagger.json" assert { type: "json" };
import bodyParser from "body-parser";
import SeedQuestion from "./questions.json" assert { type: "json" };
import SeedInsuranceTypes from "./insuranceTypes.json" assert { type: "json" };
import {
  seedQuestionToDB,
  seedInsuranceType,
} from "./controllers/seed.controller.js";

import Question from "./models/NewQuestion.js";
import QuestionOption from "./models/QuestionOption.js";
import InsuranceType from "./models/InsuranceType.js";

const app = express();
app.use(cors());

dotenv.config();

const seedInsuranceQuestions = async () => {
  // drop question option collection
  QuestionOption.collection.drop(async function (err, delOK) {
    if (err) throw err;
    if (delOK) {
      // after droping the children.. collection .. drop the parent collection
      await Question.collection.drop(async function (err, delOK) {
        if (err) throw err;
        if (delOK) {
          // iterate over the json data and seed the data
          for (let i = 0; i < SeedQuestion?.length; i++) {
            let created = await seedQuestionToDB(SeedQuestion[i]);
            console.log("created is ", created);
          }
        }
      });
    }
  });
};

const seedInsuranceTypes = async () => {
  // drop insurance type collection
  InsuranceType.collection.drop(async function (err, delOK) {
    if (err) throw err;
    if (delOK) {
      for (let i = 0; i < SeedInsuranceTypes?.length; i++) {
        let created = await seedInsuranceType(SeedInsuranceTypes[i]);
      }
    }
  });
};

const connect = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO)
      .then((client) => {
        // console.log("e is ", e);

        // seed the basic questions
        // seedInsuranceTypes().then((response) => {
        //   seedInsuranceQuestions();
        // });
      })
      .catch((err) => console.log("mongodb connection failed", err));
  } catch (error) {
    throw error;
  }
};

//
app.use(bodyParser.json());

//Middleware
app.use(cookieparser());
app.use(express.json());

// newly added
app.use("/api/insuranceCompany", insuranceCompanyRoute);
app.use("/api/insuranceCompanyRating", insuranceCompanyRatingRoute);
app.use("/api/insuranceTypes", insuranceTypesRoute);
app.use("/api/newQuestions", newQuestionsRoute);
app.use("/api/questionOptions", questionOptionsRoute);
app.use("/api/userMotorDetails", userMotorDetailRoute);
app.use("/api/insuranceFee", userInsuranceFeeRoute);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: error.stack,
  });
});

app.listen(8800, () => {
  connect();
});
