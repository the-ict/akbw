import express from "express";
import type { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import logger from "./utils/loggers.js";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

// configure dotenv
dotenv.config();

// initialize express
const app = express();

// environment variables
const PORT = process.env.PORT || 3000;

// middlewares
app.use(helmet());
app.use(morgan("combined"));
app.use(cors({
    origin: "http://localhost:5000",
}));

// routes
app.get("/", (req: Request, res: Response) => {
    res.send("Working !");
});

// error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send("Something broke!");
});

// start server
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});