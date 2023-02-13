import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/user.route";
import roleRoute from "./routes/role.route";
import userTypeRoute from "./routes/user-type.route";
import authRoute from "./routes/auth.route";
import cookieparser from "cookie-parser";
import swaggerJsDoc from "swagger-jsdoc";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./swagger.json";
import bodyParser from "body-parser";

const app = express();
app.use(cors());

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO as string);
  } catch (error) {
    throw error;
  }
};

//
app.use(bodyParser.json());

//Middleware
app.use(cookieparser());
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/userTypes", userTypeRoute);
app.use("/api/roles", roleRoute);
app.use("/api/auth", authRoute);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((error: any, req: any, res: any, next: any) => {
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
