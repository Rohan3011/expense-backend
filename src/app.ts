require("dotenv").config();
import express from "express";
import config from "config";
import { connectToDB } from "../utils/db";
import log from "../utils/logger";
import router from "./routes";
import deserializeUser from "./middleware/deserializeUser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_, res) => {
  res.send("Welcome to Expense Tracker API");
});

app.use(deserializeUser);
app.use("/api", router);

const port = config.get("port");
app.listen(port, () => {
  log.info(`Server is running at https://localhost:${port}`);
  connectToDB();
});
