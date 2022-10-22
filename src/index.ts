import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import routes from "./routes";

dotenv.config();

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error("Error connecting to DB");
}

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Successfully connected to the DB");
  })
  .catch((err) => console.log(err));

const port = process.env.SERVER_PORT || 8080;
const app = express();

app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`🚀 Server started at http://localhost:${port}`);
});
