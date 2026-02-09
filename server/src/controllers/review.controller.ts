import type {
    NextFunction,
    Request,
    Response
} from "express";
import {
    prisma
} from "../db/client.js";


export const createReview = async (req: Request, res: Response) => {
    try {
        const { rating, comment, product_id } = req.body;

        const review = await prisma.reviews.create({
            data: {
                rating,
                comment,
                product_id: parseInt(product_id),
                user_id: req.user
            }
        });

        return res.status(201).json({
            message: "Review created successfully",
            ok: true,
            review
        });
    } catch (error) {
        console.error("Error creating review:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getProductReviews = async (req: Request, res: Response) => {
    try {
        const { productId: product_id } = req.params;
        console.log(req.params, "PARAMS");
        console.log(product_id, "PRODUCT ID");

        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const [reviews, total] = await Promise.all([
            prisma.reviews.findMany({
                where: { product_id: Number(product_id) },
                orderBy: { createdAt: "desc" },
                skip,
                take: limit,
                include: {
                    user: true,
                }
            }),
            prisma.reviews.count({
                where: { product_id: Number(product_id) },
            }),
        ]);

        console.log(reviews, "REVIES");

        res.json({
            data: reviews,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllReviews = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const [reviews, total] = await Promise.all([
            prisma.reviews.findMany({
                include: {
                    product: {
                        include: {
                            translations: true,
                        },
                    },
                },
                orderBy: { createdAt: "desc" },
                skip,
                take: limit,
            }),
            prisma.reviews.count(),
        ]);

        res.json({
            data: reviews,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Error fetching all reviews:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { reviewId } = req.params;
        console.log(req.params, "DELETE REVIEW PARAMS");
        console.log(reviewId, "this is review id");

        await prisma.reviews.delete({
            where: {
                id: Number(reviewId),
            },
        });
        res.json({
            message: "Review deleted successfully",
            ok: true,
        });
    } catch (error) {
        next(error);
    }
}