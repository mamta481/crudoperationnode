import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";
//configure env
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      dbName: process.env.DB_NAME,
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
    });
    console.log(
      `Connected to MongoDB Database ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`error in mongoDB ${error}`.bgBlue.white);
  }
};

export default connectDB;
