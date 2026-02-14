import { prisma } from "../db/client";
import { type Request, type Response, type NextFunction } from "express";

export const getDashboardData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dayRange = req.query.dayRange as string;

        const threeMonthsAgo = new Date();
        threeMonthsAgo.setDate(threeMonthsAgo.getDate() - Number(dayRange || 30));

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

        const threeMonthsAgo = new Date();
        threeMonthsAgo.setDate(threeMonthsAgo.getDate() - Number(dayRange || 30));

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

        const weekSales = [];
        const monthSales = [];

        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            date.setHours(0, 0, 0, 0);
            const nextDay = new Date(date);
            nextDay.setDate(nextDay.getDate() + 1);

            const count = await prisma.orders.count({
                where: {
                    createdAt: {
                        gte: date,
                        lt: nextDay
                    }
                }
            });
            weekSales.push({ date: date.toISOString().split('T')[0], count });
        }

        for (let i = 0; i < 30; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            date.setHours(0, 0, 0, 0);
            const nextDay = new Date(date);
            nextDay.setDate(nextDay.getDate() + 1);

            const count = await prisma.orders.count({
                where: {
                    createdAt: {
                        gte: date,
                        lt: nextDay
                    }
                }
            });
            monthSales.push({ date: date.toISOString().split('T')[0], count });
        }

        const mostSoldProducts = await prisma.orderItem.groupBy({
            by: ['productId'],
            _sum: {
                quantity: true
            },
            where: {
                createdAt: {
                    gte: threeMonthsAgo
                }
            },
            orderBy: {
                _sum: {
                    quantity: 'desc'
                }
            },
            take: 5
        });

        const productDetails = await prisma.products.findMany({
            where: {
                id: { in: mostSoldProducts.map(p => p.productId) }
            },
            include: {
                translations: true
            }
        });

        const mostSoldSizes = await prisma.orderItem.groupBy({
            by: ['sizeId'],
            _sum: {
                quantity: true
            },
            where: {
                createdAt: {
                    gte: threeMonthsAgo
                },
                sizeId: { not: null }
            },
            orderBy: {
                _sum: {
                    quantity: 'desc'
                }
            },
            take: 5
        });

        const sizeDetails = await prisma.sizes.findMany({
            where: {
                id: { in: mostSoldSizes.map(s => s.sizeId as number) }
            },
            include: {
                translations: true
            }
        });

        const mostSoldColors = await prisma.orderItem.groupBy({
            by: ['colorId'],
            _sum: {
                quantity: true
            },
            where: {
                createdAt: {
                    gte: threeMonthsAgo
                },
                colorId: { not: null }
            },
            orderBy: {
                _sum: {
                    quantity: 'desc'
                }
            },
            take: 5
        });

        const colorDetails = await prisma.colors.findMany({
            where: {
                id: { in: mostSoldColors.map(c => c.colorId as number) }
            },
            include: {
                translations: true
            }
        });

        return res.status(200).json({
            averageCheckPrice: averageCheckPrice._avg.total_price || 0,
            dailyAverageOrdersPrice: (dailyAverageOrdersPrice._sum.total_price || 0) / (Number(dayRange) || 1),
            monthsOrdersNumber,
            newUserCount,
            weekSales,
            monthSales,
            mostSoldProducts: mostSoldProducts.map(p => ({
                ...p,
                details: productDetails.find(pd => pd.id === p.productId)
            })),
            mostSoldSizes: mostSoldSizes.map(s => ({
                ...s,
                details: sizeDetails.find(sd => sd.id === s.sizeId)
            })),
            mostSoldColors: mostSoldColors.map(c => ({
                ...c,
                details: colorDetails.find(cd => cd.id === c.colorId)
            }))
        });

    } catch (error) {
        next(error);
    }
}