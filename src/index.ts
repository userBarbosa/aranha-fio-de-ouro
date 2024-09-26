import cors from "cors";
import express, { json, urlencoded } from "express";
import { environment } from "./config/environment";
import logger from "./utils/logger";

import userRouter from "./app/routes/users.routes";
import groupRouter from "./app/routes/groups.routes";
import contactRouter from "./app/routes/contacts.routes";
import { dbHealthCheck } from "./services/database";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE", "PATCH"],
  })
);

app.use(urlencoded({ extended: true }));
app.use(json());

app.get("/health-check/db", async (req, res) => {
  let statusCode = 200;
  let message = "Database is running.";
  const isMongoHealthy = await dbHealthCheck();
  if (isMongoHealthy) {
    console.log("Mongo is healthy (=");
  } else {
    statusCode = 500;
    message = "Database is not running, send help.";
    console.error(message);
  }
  res.status(statusCode).send(message);
});

app.get("/health-check", (req, res) => {
  console.log("I'm healthy (=");
  res.status(200).send("Server is running.");
});

app.use("/", userRouter);
app.use("/", groupRouter);
app.use("/", contactRouter);

app.listen(environment.API_PORT, () =>
  logger.info(`Running on server on ${environment.API_PORT} port`)
);
