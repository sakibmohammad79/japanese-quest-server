import express, { Application } from "express";
import cors from "cors";
import router from "./app/routes";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFoundHandler from "./app/middleware/notFoundHandler";
const app: Application = express();

app.use(cors());
//parser
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/v1", router);

app.use(globalErrorHandler);

app.use(notFoundHandler);

export default app;
