import { Router } from "express";
import { getDashboardData, getStatisticsData } from "../controllers/dashboard.controller";

const router = Router();

router.get("/", getDashboardData);
router.get("/statistics", getStatisticsData);

export default router;