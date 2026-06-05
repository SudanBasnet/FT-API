import express from "express";
import {
  deleteTransactions,
  getTransaction,
  insertTransaction,
} from "../models/transaction/TransactionModel.js";

const router = express.Router();

//!insert transaction
router.post("/", async (req, res, next) => {
  try {
    const { _id } = req.userInfo;
    req.body.userId = _id;
    const result = await insertTransaction(req.body);
    result?._id
      ? res.json({
          status: "success",
          message: "transaction success",
          result,
        })
      : res.json({
          status: "error",
          message: "unable to add new transaction. Please review ",
          result,
        });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

//!Return transaction for specific users

router.get("/", async (req, res, next) => {
  try {
    //!get all transactions

    const { _id } = req.userInfo;

    const transactions = (await getTransaction(_id)) || [];
    res.json({
      status: "success",
      message: "Transactions fetched",
      transactions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

//!delete transactions
router.delete("/", async (req, res) => {
  try {
    //receive ids and id of user
    const { ids } = req.body;

    const { _id } = req.userInfo;
    console.log(ids, _id);

    //perform deletion query
    const result = await deleteTransactions(_id, ids);

    res.json({
      status: "Success",
      message: result.deletedCount + " transaction to be deleted",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

export default router;
