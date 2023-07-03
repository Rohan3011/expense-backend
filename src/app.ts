import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectToDB } from "../utils/db";
import log from "../utils/logger";
import router from "./routes";
import deserializeUser from "./middleware/deserializeUser";
import cookieJwtAuth from "./middleware/cookieJwtAuth";

const app = express();

const clientURL = process.env.CLIENT_URL;

app.use(
  cors({
    origin: clientURL,
    methods: ["GET", "OPTIONS", "PATCH", "DELETE", "POST", "PUT"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_, res) => {
  res.send("Welcome to Expenditure API");
});

app.use(cookieJwtAuth);
app.use(deserializeUser);
app.use("/api", router);

const port = process.env.PORT;
app.listen(port, () => {
  log.info(`Server is running at http://localhost:${port}`);
  connectToDB();
});
