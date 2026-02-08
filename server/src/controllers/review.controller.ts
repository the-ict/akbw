import type { Request, Response } from "express";
import { prisma } from "../db/client.js";


// Create a new review
export const createReview = async (req: Request, res: Response) => {
    try {
        const { rating, comment, userName, productId } = req.body;

        // Check if product exists
        const product = await prisma.products.findUnique({
            where: { id: productId },
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Create review
        const review = await prisma.reviews.create({
            data: {
                rating,
                comment,
                userName,
                productId,
            },
        });

        res.status(201).json(review);
    } catch (error) {
        console.error("Error creating review:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get reviews for a specific product
export const getProductReviews = async (req: Request, res: Response) => {
    try {
        const productId = parseInt(req.params.productId);
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const [reviews, total] = await Promise.all([
            prisma.reviews.findMany({
                where: { productId },
                orderBy: { createdAt: "desc" },
                skip,
                take: limit,
            }),
            prisma.reviews.count({
                where: { productId },
            }),
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
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all reviews (admin)
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
