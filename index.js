import express from "express";
import bootstrap from "./src/app.controller.js";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT;

bootstrap(app, express);
app.listen(PORT, () => {
  console.log("Server is listening on port ", PORT);
});
