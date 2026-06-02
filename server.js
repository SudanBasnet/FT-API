import express from "express";
import userRouter from "./routers/userRouter.js";
import { conMongoDb } from "./config/mongodbConfig.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;

//!connect Databse
conMongoDb();

//!middlewares
app.use(express.json());
app.use(cors());

//!API endpoints
app.use("/api/v1/users", userRouter);
app.get("/", (req, res) => {
  res.json({
    message: "its live",
    status: 200,
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server running at http://localhost:${PORT}`);
});
