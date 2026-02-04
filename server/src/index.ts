import express from "express";
import type {
    NextFunction,
    Request,
    Response
} from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

// import routers
import authRoutes from "./routers/auth.routes.js";
import smsRoutes from "./routers/sms.routes.js";

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
    origin: ["http://localhost:3001", "http://localhost:3002"],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req: Request, res: Response) => {
    res.send("Working !");
});

app.use("/api/auth", authRoutes);
app.use("/api/sms", smsRoutes);

// error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        message: err.message,
    });
});

// start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});