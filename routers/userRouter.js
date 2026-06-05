import express from "express";
import { getUserByEmail, insertUser } from "../models/user/UserModel.js";
import { comparePassword, hashPassword } from "../utils/bcryptjs.js";
import { signJWT } from "../utils/jwt.js";
import { auth } from "../middlewares/authMiddleware.js";
const router = express.Router();

//!user signup
router.post("/", async (req, res, next) => {
  try {
    //*encript the password
    req.body.password = hashPassword(req.body.password);
    const user = await insertUser(req.body);

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
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message = "Email already exists. Please use a different email.";
    }
    error.statusCode = 200;
    next(error);
  }
});

//!user Login
router.post("/login", async (req, res, next) => {
  try {
    //* get the user obj
    const { email, password } = req.body;
    //*data verification
    if (email && password) {
      //* finding user by email
      const user = await getUserByEmail(email);
      //* compare the password
      if (user?._id) {
        const isMatched = await comparePassword(password, user.password);
        if (isMatched) {
          //JWT token can be generated here and sent to the client for future authentication
          const accessJWT = signJWT({ email: user.email });
          return res.json({
            status: "Success",
            message: "Login successful",
            user,
            accessJWT,
          });
        }
      }
    }
    //*encrypt the password and compare with the one in the database

    res.status(401).json({
      message: "Invalid email or password",
    });
  } catch (error) {
    next(error);
  }
});

//!user Profile

router.get("/", auth, (req, res, next) => {
  try {
    const user = req.userInfo;
    res.json({
      status: "Success",
      message: "This is the user profile route",
      user,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
