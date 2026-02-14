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

        const productIds = items.map((i: any) => i.productId);
        const products = await prisma.products.findMany({
            where: { id: { in: productIds } }
        });

        const order = await prisma.orders.create({
            data: {
                user_id,
                total_price,
                status: 'review',
                coupon_id: data.coupon_id,
                orderItems: {
                    create: items.map((item: any) => {
                        const product = products.find(p => p.id === item.productId);
                        return {
                            productId: item.productId,
                            sizeId: item.sizeId,
                            colorId: item.colorId,
                            quantity: item.quantity,
                            price: product ? product.price : 0
                        };
                    })
                }
            },
            include: {
                orderItems: true
            }
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
                },
                orderItems: {
                    include: {
                        product: {
                            include: {
                                translations: true
                            }
                        },
                        size: {
                            include: {
                                translations: true
                            }
                        },
                        color: {
                            include: {
                                translations: true
                            }
                        }
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

export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const order = await prisma.orders.update({
            where: { id: Number(id) },
            data: { status }
        });

        res.status(200).json({
            message: "Order status updated successfully",
            data: order,
            ok: true
        });
    } catch (error) {
        next(error);
    }
}

export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await prisma.orders.findMany({
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
                },
                orderItems: {
                    include: {
                        product: {
                            include: {
                                translations: true
                            }
                        },
                        size: {
                            include: {
                                translations: true
                            }
                        },
                        color: {
                            include: {
                                translations: true
                            }
                        }
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