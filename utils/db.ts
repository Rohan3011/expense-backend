import mongoose from "mongoose";
import config from "config";
import log from "./logger";

export const connectToDB = async () => {
  const mongoURI = config.get<string>("mongoURI");
  try {
    const connect = await mongoose.connect(mongoURI);
    log.info(`Connected to Database successfully`);
  } catch (err) {
    log.error(err);
    process.exit(1);
  }
};
