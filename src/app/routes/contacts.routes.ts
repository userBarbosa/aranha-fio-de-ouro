"use strict";
import { Router } from "express";
import { validateTokenMiddleware } from "../../utils/token";
import {
  CreateContact,
  DeleteContact,
  GetContact,
  UpdateContact,
} from "../controllers/contacts.controller";

const contactRouter = Router();
const baseContactPath = "/contacts";

contactRouter.post(
  `${baseContactPath}`,
  validateTokenMiddleware,
  CreateContact
);

contactRouter.get(`${baseContactPath}/:id`, validateTokenMiddleware, GetContact);

contactRouter.put(
  `${baseContactPath}/:id`,
  validateTokenMiddleware,
  UpdateContact
);

contactRouter.delete(
  `${baseContactPath}/:id`,
  validateTokenMiddleware,
  DeleteContact
);

export default contactRouter;
