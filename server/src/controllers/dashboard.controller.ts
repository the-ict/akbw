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


export const getStatisticsData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dayRange = req.query.dayRange as string;

        const day = new Date();
        const threeMonthsAgo = new Date(day.getDate() - Number(dayRange));

        // callculate average check price
        // calculate daily average orders price
        // callculate last months total orders number
        // calculate new users number for a last months
        // calculate sales per day by order number
        // calculate the most sold sizes and colors
        // calculate the most sold products

        const averageCheckPrice = await prisma.orders.aggregate({
            _avg: {
                total_price: true,
            },
            where: {
                createdAt: {
                    gte: threeMonthsAgo
                }
            }
        });

        const dailyAverageOrdersPrice = await prisma.orders.aggregate({
            _sum: {
                total_price: true,
            },
            where: {
                createdAt: {
                    gte: threeMonthsAgo
                }
            }
        });

        const monthsOrdersNumber = await prisma.orders.count({
            where: {
                createdAt: {
                    gte: threeMonthsAgo
                }
            }
        });

        const newUserCount = await prisma.user.count({
            where: {
                createdAt: {
                    gte: threeMonthsAgo
                }
            }
        });

        const week = 7;
        const month = 30;

        const weekSales = [];
        const monthSales = [];

        for (let i = 0; i < week; i++) {
            const weekDay = new Date(day.getDate() - i);
            const weekDayOrders = await prisma.orders.count({
                where: {
                    createdAt: {
                        gte: weekDay,
                        lte: weekDay
                    }
                }
            });
            weekSales.push(weekDayOrders);
        };

        for (let i = 0; i < month; i++) {
            const monthDay = new Date(day.getDate() - i);
            const monthDayOrders = await prisma.orders.count({
                where: {
                    createdAt: {
                        gte: monthDay,
                        lte: monthDay
                    }
                }
            });
            monthSales.push(monthDayOrders);
        };

    } catch (error) {
        next(error);
    }
}