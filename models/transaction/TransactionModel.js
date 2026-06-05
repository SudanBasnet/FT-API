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

export const deleteTransactions = (userId, idsToDelete) => {
  return TransactionSchema.deleteMany({ userId, _id: { $in: idsToDelete } });
};
