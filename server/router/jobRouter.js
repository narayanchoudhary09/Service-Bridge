import express from "express";
import { createJob } from "../controllers/jobController.js";
import { isWorkerAuth } from "../middleWare/isAuthWorker.js";
import { isUserAuth } from "../middleWare/isAuthUser.js";
import { getJobByCategory, getSearch, connectToEmployee } from "../controllers/searchController.js";
import userRouter from "./userRouter.js";

const jobRouter = express.Router();

jobRouter.post('/create-job', isWorkerAuth, createJob);
jobRouter.get('/get-jobs', isUserAuth, getSearch);
jobRouter.post('/get-jobs', isUserAuth, getJobByCategory);
jobRouter.post('/connect/:id',isUserAuth, connectToEmployee);

export default jobRouter;
