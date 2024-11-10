import * as dotenv from "dotenv";
import express from "express";
import { dbConnect } from "./db/db";
import { router as locationRouter } from "./Routes/location";
import { router as logsRouter } from "./Routes/logs";
import { router as workScopeRouter } from "./Routes/workspace";

dotenv.config();

const app = express();
const port = process?.env?.PORT || 4000;

// middlewares
app.use(express.json());
app.use('/location', locationRouter)
app.use('/logs', logsRouter)
app.use('/workscope', workScopeRouter)

const startServer = async () => {
  try {
    await dbConnect();
    app.listen(port, async () => {
      console.log(`Server is runnning on port ${port}!`);
    });
  } catch (error) {
    console.log(error);
    process?.exit(1);
  }
};

startServer();
