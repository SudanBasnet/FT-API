import express from "express";
import { insertUser } from "../models/user/UserModel.js";
import { hashPassword } from "../utils/bcryptjs.js";
const router = express.Router();

//!user signup
router.post("/", async (req, res, next) => {
  try {
    //* get the user obj
    //*data verification
    //*encript the password
    req.body.password = hashPassword(req.body.password);
    const user = await insertUser(req.body);
    console.log(req.body.password);

    user?._id
      ? res.json({
          status: "Success",
          message: "your account has been created, you may login now",
          user,
        })
      : res.json({
          status: "Error",
          message: "Error Creating User. Please try again later",
        });
  } catch (error) {
    console.log(error);
    res.json({
      status: "Error",
      message: error.message,
    });
  }
});

//!user Login

//!user Profile

export default router;
