"use strict";
import { Router } from "express";
import { validateTokenMiddleware } from "../../utils/token";
import {
  Create,
  GetGroups,
  UpdateGroup,
  DeleteGroup,
  AddContactToGroup,
  GetGroupContacts,
  RemoveContactFromGroup,
  GetGroup,
  AddMembers,
} from "../controllers/groups.controller";
import { isGroupAdmin } from "../../utils/middlewares";

const groupRouter = Router();
const baseGroupPath = "/groups";

groupRouter.post(`${baseGroupPath}/new`, validateTokenMiddleware, Create);

groupRouter.get(`${baseGroupPath}/:id`, validateTokenMiddleware, GetGroup);

groupRouter.get(`${baseGroupPath}`, validateTokenMiddleware, GetGroups);

groupRouter.put(`${baseGroupPath}/:id`, validateTokenMiddleware, UpdateGroup);

groupRouter.post(
  `${baseGroupPath}/:id/members`,
  validateTokenMiddleware,
  isGroupAdmin,
  AddMembers
);

groupRouter.delete(
  `${baseGroupPath}/:id`,
  validateTokenMiddleware,
  DeleteGroup
);

groupRouter.post(
  `${baseGroupPath}/:id/contacts`,
  validateTokenMiddleware,
  AddContactToGroup
);

groupRouter.get(
  `${baseGroupPath}/:id/contacts`,
  validateTokenMiddleware,
  GetGroupContacts
);

groupRouter.delete(
  `${baseGroupPath}/:id/contacts/:contactId`,
  validateTokenMiddleware,
  isGroupAdmin,
  RemoveContactFromGroup
);
export default groupRouter;
