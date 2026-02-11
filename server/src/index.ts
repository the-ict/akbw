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
import userRoutes from "./routers/user.routes.js";
import adminRoutes from "./routers/admin.routes.js";
import productRoutes from "./routers/product.routes.js";
import uploadRoutes from "./routers/upload.routes.js";
import reviewRoutes from "./routers/review.routes.js";
import orderRoutes from "./routers/order.routes.js";
import notificationRoutes from "./routers/notification.routes.js";
import path from "path";


// configure dotenv
dotenv.config();

// initialize express
const app = express();

// environment variables
const PORT = process.env.PORT || 3000;

// middlewares
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(morgan("combined"));
app.use(cors({
    origin: ["http://localhost:3001", "http://localhost:3002"],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


// routes
app.get("/", (req: Request, res: Response) => {
    res.send("Working !");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/sms", smsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/product", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/notification", notificationRoutes);

// error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Global Error Handler:", err);
    res.status(500).json({
        message: err.message,
    });
});

// start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});