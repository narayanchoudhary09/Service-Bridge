import express from "express";
import { createRating, getAverageRating, getAllRating } from "../controllers/ratingController.js";
import { isUserAuth } from "../middleWare/isAuthUser.js";
import { createReview, getAllReview } from "../controllers/reviewController.js";
import { isWorkerAuth } from "../middleWare/isAuthWorker.js";

const ratingRouter = express.Router();


ratingRouter.post('/post-rating/:workerId', isUserAuth, createRating);
ratingRouter.get('/getAverageRating/:workerId', isWorkerAuth, getAverageRating);
ratingRouter.get('/getAllRating/:workerId', isWorkerAuth, getAllRating);
ratingRouter.post('/post-review/:workerId', isUserAuth, createReview);
ratingRouter.get('/getAllReview/:workerId', isWorkerAuth, getAllReview);
export default ratingRouter;
