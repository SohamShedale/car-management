import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/db.js";
import userRouter from "./routes/user-routes.js";
import carRouter from "./routes/car-routes.js";
dotenv.config({});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "https://car-management-frontend-two.vercel.app",
  credentials: true,
  methods: ["POST", "GET", "PUT", "DELETE"]
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

app.use("/api/user", userRouter);
app.use("/api/product", carRouter);

app.listen(`${PORT}`, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});
