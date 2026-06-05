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
    next(error);
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
    next(error);
  }
});

//!delete transactions
router.delete("/", async (req, res, next) => {
  try {
    //receive ids and id of user
    const { ids } = req.body;

    const { _id } = req.userInfo;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Please provide transaction ids to delete",
      });
    }

    //perform deletion query
    const result = await deleteTransactions(_id, ids);

    res.json({
      status: "success",
      message: result.deletedCount + " transaction deleted",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
