import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";

//configure env
dotenv.config();

//dataconfigure

connectDB();
//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoute);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Hii Welcome</h1>");
});

//port
const port = process.env.PORT || 3000;
const DEV = process.env.DEV_MODE || "development";

//run listen
app.listen(port, () => {
  console.log(`server running ${DEV} on ${port}`.bgGreen.white);
});
