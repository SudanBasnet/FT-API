import express from "express";
import userRouter from "./routers/userRouter.js";
import { conMongoDb } from "./config/mongodbConfig.js";
import transactionRouter from "./routers/transactionRouter.js";
import cors from "cors";
import { auth } from "./middlewares/authMiddleware.js";
import { errorHandler } from "./middlewares/errorHandlerMiddleware.js";

const app = express();
const PORT = process.env.PORT || 8000;

//!connect Databse
await conMongoDb();

//!middlewares
app.use(express.json());
app.use(cors());

//!API endpoints
app.use("/api/v1/users", userRouter);
app.use("/api/v1/transactions", auth, transactionRouter);
app.get("/", (req, res) => {
  res.json({
    message: "its live",
    status: 200,
  });
});

//!404 Page not found
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.statusCode = 404;
  next(error);
});

//!Global Error Handler
app.use(errorHandler);

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server running at http://localhost:${PORT}`);
});
