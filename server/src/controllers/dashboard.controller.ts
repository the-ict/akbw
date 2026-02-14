import { prisma } from "../db/client";
import { type Request, type Response, type NextFunction } from "express";

export const getDashboardData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dayRange = req.query.dayRange as string;

        const day = new Date();
        const threeMonthsAgo = new Date(day.getDate() - Number(dayRange));

        const overAllSales = await prisma.orders.aggregate({
            _sum: {
                total_price: true,
            },
            where: {
                createdAt: {
                    gte: threeMonthsAgo
                }
            }
        });
        const overallOrdersNumberAtThreeMonthsAgo = await prisma.orders.count({
            where: {
                createdAt: {
                    lte: threeMonthsAgo
                }
            }
        });

        const ordersNumber = await prisma.orders.count({
            where: {
                createdAt: {
                    gte: threeMonthsAgo
                }
            }
        });

        const usersNumber = await prisma.user.count({
            where: {
                createdAt: {
                    gte: threeMonthsAgo
                }
            }
        });

        const grownPercentsAtOrders = (ordersNumber / overallOrdersNumberAtThreeMonthsAgo) * 100;

        return res.status(200).json({
            overAllSales,
            ordersNumber,
            usersNumber,
            grownPercentsAtOrders,
        });
    } catch (error) {
        next(error);
    }
}