import mongoose from "mongoose";
import log from "./logger";
import "dotenv/config";
const mongoURI = process.env.MONGO_URI!;

export const connectToDB = async () => {
  try {
    const mongoInstance = MongoInstance.getInstance();
    log.info(`Connected to Database successfully`);
  } catch (err) {
    log.error(err);
    process.exit(1);
  }
};

class MongoInstance {
  public static instance: typeof mongoose;

  public static async getInstance() {
    if (!this.instance) {
      this.instance = await mongoose.connect(mongoURI);
    }
    return this.instance;
  }
}
