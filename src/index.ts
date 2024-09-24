import cors from "cors";
import express, { json, urlencoded } from "express";
import { environment } from "./config/environment";
import logger from "./utils/logger";

import userRouter from "./app/routes/users.routes";
import groupRouter from './app/routes/groups.routes';
import contactRouter from './app/routes/contacts.routes';

const app = express();

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());

app.use("/", userRouter);
app.use("/", groupRouter);
app.use("/", contactRouter);

app.listen(environment.API_PORT, () =>
  logger.info(`Running on server on ${environment.API_PORT} port`)
);
