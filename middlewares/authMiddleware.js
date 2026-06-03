import { getUserByEmail } from "../models/user/UserModel.js";
import { verifyJWT } from "../utils/jwt.js";

export const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const result = verifyJWT(authorization);
    //validate if the token is valid or not
    if (result?.email) {
      const user = await getUserByEmail(result.email);
      if (user?._id) {
        //user is authorized
        //store user in req.headers
        user.password = undefined;
        req.userInfo = user;
        return next();
        //got to next function
      }
    }
    res.status(403).json({
      error: "unauthorized",
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};
