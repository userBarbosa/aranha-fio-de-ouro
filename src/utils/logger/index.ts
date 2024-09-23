"use strict";

import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const transport = new DailyRotateFile({
  filename: "aranha-fio-de-ouro-%DATE%.log",
  dirname: "logs",
  datePattern: "d",
  maxSize: "20m",
  maxFiles: "7d",
});

transport.on("rotate", function (oldFile, newFile) {
  winstonLogger.info({
    evaluation: "New file created!",
    timestamp: new Date().toISOString(),
  });
});

const winstonLogger = createLogger({
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({
      stack: true,
    }),
    format.splat(),
    format.json()
  ),
  transports: [
    transport,
    new transports.Console(),
    new transports.File({
      filename: "aranha-fio-de-ouro.err",
      dirname: "logs",
      level: "error",
    }),
  ],
});

const logger = {
  info: winstonLogger.info.bind(winstonLogger),
  warn: winstonLogger.warn.bind(winstonLogger),
  error: winstonLogger.error.bind(winstonLogger),
  debug: winstonLogger.debug.bind(winstonLogger),
  child: winstonLogger.child.bind(winstonLogger),
};

export default logger;
