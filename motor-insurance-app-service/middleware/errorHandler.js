import { logEvents } from "./logEvents";

export const ErrorHandler = (error, req, res, next) => {
  logEvents(`${err.name}:${err.message}`, "errLog.txt");
  console.error(err.stack);
  res.status(500).send(err.message);
};
