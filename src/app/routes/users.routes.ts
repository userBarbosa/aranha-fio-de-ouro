"use strict";

import { Router } from "express";
import {
  Create,
  GetCurrentUser,
  Login,
  UpdateUser,
} from "../controllers/users.controller";
import { validateTokenMiddleware } from "../../utils/token";

const userRouter = Router();
const basePath = "/users";

userRouter.post(`${basePath}/signup`, Create);
userRouter.post(`${basePath}/login`, Login);

userRouter.get(`${basePath}/me`, validateTokenMiddleware, GetCurrentUser);

userRouter.patch(`${basePath}/update`, validateTokenMiddleware, UpdateUser);

export default userRouter;
