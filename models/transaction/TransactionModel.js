import TransactionSchema from "./TransactionSchema.js";

//!insert Query

export const insertTransaction = (obj) => {
  return TransactionSchema(obj).save();
};

export const getTransaction = (userId) => {
  if (!userId) {
    throw new Error("userId is required");
  }
  return TransactionSchema.find({ userId });
};
