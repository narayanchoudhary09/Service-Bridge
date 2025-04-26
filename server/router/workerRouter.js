import express from 'express';
import { register, login, logout, updateAddress, updateProfile, myJobs } from '../controllers/workerController.js';
import jobRouter from './jobRouter.js';
import { isWorkerAuth } from '../middleWare/isAuthWorker.js';


const workerRouter = express.Router();

workerRouter.use('/jobs', jobRouter);
workerRouter.post('/register-worker', register);
workerRouter.post('/login-worker', login);
workerRouter.post('/logout-worker', logout);
workerRouter.put('/update-address', isWorkerAuth, updateAddress);
workerRouter.post('/update-profile/:id', isWorkerAuth, updateProfile);
workerRouter.get('/my-jobs', isWorkerAuth, myJobs);



export default workerRouter;
