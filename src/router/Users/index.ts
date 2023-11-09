import express from 'express';
const userRouter = express.Router();

import * as userController from '../../controller/Users/index';

userRouter.post("/", userController.create);
userRouter.get("/", userController.findAll);

export default userRouter;
