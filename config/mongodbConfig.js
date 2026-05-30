import mongoose from "mongoose";
const MONGO_URL = "mongodb://localhost:27017/FT-DB";

export const conMongoDb = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URL);

    console.log("mongoDB connected");
    console.log("Database:", conn.connection.name);
  } catch (error) {
    console.log(error);
  }
};
