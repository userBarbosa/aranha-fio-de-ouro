import cors from "cors";
import express, { json, urlencoded } from "express";
import { environment } from "./config/environment";
import userRouter from "./app/routes/users.routes";
import logger from "./utils/logger";

const app = express();

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());

app.use("/", userRouter);

app.listen(environment.PORT, () =>
  logger.info(`Running on server on ${environment.PORT} port`)
);
