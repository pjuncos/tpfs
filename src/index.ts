import dotenv from "dotenv";
import express from "express";

import routes from "./routes";

dotenv.config();
const port = process.env.SERVER_PORT || 8080;
const app = express();

app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`🚀 Server started at http://localhost:${port}`);
});
