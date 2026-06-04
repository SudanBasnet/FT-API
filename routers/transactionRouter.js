import express from "express";

const router = express.Router();

//insert transaction
router.post("/", (req, res, next) => {
  try {
    const { _id } = req.userInfo;
    req.body.userID = _id;
    console.log(_id);
    console.log(req.body);
    res.json({
      status: "success",
      message: "todo transaction",
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
