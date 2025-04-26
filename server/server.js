import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import userRouter from './router/userRouter.js';
import workerRouter from './router/workerRouter.js';
import adminRouter from './router/adminRoutes.js';
import ratingRouter from './router/ratingRoutes.js';
import { connect } from './config/connection.js';
import cookieParser from 'cookie-parser';
import cors from "cors"

dotenv.config();

const app = express();
const port = process.env.PORT || 8001;

app.use(express.json());
app.use(
  cors({
    origin: ["https://service-bridge-liard.vercel.app", "http://localhost:5173"],
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT']
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Route splitting
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/worker", workerRouter);
app.use("/api/v1/rating", ratingRouter);

// Connect to database
connect();

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
