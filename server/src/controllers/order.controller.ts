import type { Request, Response, NextFunction } from "express"
import { prisma } from "../db/client"

export const reviewOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id = req.user;
        const { items, total_price, coupon_id, coupon_code } = req.body;

        const user = await prisma.user.findUnique({
            where: { id: user_id }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                ok: false
            });
        }

        const data: any = {
            user_id,
            items,
            total_price,
            status: 'review',
        };

        if (coupon_id && coupon_id !== 0) {
            data.coupon_id = coupon_id;
        } else if (coupon_code) {
            const coupon = await prisma.coupons.findFirst({
                where: { code: coupon_code }
            });
            if (coupon) {
                data.coupon_id = coupon.id;
            }
        }

        const order = await prisma.orders.create({
            data
        });

        res.status(201).json({
            message: "Order created successfully",
            data: order,
            ok: true
        });
    } catch (error) {
        next(error);
    }
}

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id = req.user;
        const orders = await prisma.orders.findMany({
            where: { user_id },
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: {
                        name: true,
                        lastName: true,
                        phone: true
                    }
                },
                coupon: {
                    select: {
                        id: true,
                        code: true,
                        discount: true,
                    }
                }
            }
        });

        res.status(200).json({
            data: orders,
            ok: true
        });
    } catch (error) {
        next(error);
    }
}