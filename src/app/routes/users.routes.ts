'use strict'

import { Router } from "express";
import { CreateUser, GetCurrentUser } from '../controllers/users.controller';
import { validateTokenMiddleware } from '../../utils/token';

const userRouter = Router();
const basePath = "/users";

userRouter.post(`${basePath}/signup`, CreateUser);

userRouter.get(`${basePath}/me`, validateTokenMiddleware, GetCurrentUser);

export default userRouter;