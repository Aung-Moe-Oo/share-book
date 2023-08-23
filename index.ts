import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

//importing custom packages
import appRouter from "./app/index";

//ENV
const PORT = process.env.PORT || 8000;

//express server instance
const app = express();
const httpServer = require("http").Server(app);

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/", appRouter);
app.use("/uploads", express.static(`${__dirname}/public/uploads`));

httpServer.listen(PORT, () => {
  console.log("server is starting on port", PORT);
});
