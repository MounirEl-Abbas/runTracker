import { readFile } from "fs/promises";

import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db/connect.js";
import Run from "./models/Run.js";

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    await Run.deleteMany();
    const mockData = JSON.parse(
      await readFile(new URL("./mock-data-runs.json", import.meta.url))
    );
    await Run.create(mockData);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
