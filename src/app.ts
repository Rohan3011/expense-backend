require("dotenv").config();
import express from "express";
import config from "config";
import { connectToDB } from "../utils/db";
import log from "../utils/logger";
import HttpStatusCode from "../utils/HttpStatusCode";
import router from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_, res) => {
  res.status(HttpStatusCode.OK).send("Welcome to Expense Tracker API");
});

app.use("/api", router);

const port = config.get("port");
app.listen(port, () => {
  log.info(`Server is running at https://localhost:${port}`);
  connectToDB();
});
