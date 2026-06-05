import mongoose from "mongoose";
const MONGO_URL = process.env.MONGO_URL;

export const conMongoDb = async () => {
  const conn = await mongoose.connect(MONGO_URL, {
    serverSelectionTimeoutMS: 10000,
  });

  console.log("mongoDB connected");
  console.log("Database:", conn.connection.name);

  return conn;
};
