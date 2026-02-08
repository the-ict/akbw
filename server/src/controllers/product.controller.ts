import type { NextFunction, Request, Response } from "express";
import { prisma } from "../db/client.js";

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { q, category_id, sortBy, sortOrder, page = 1, limit = 10 } = req.query;

        const where: any = {};
        console.log(q, "what is q");

        if (q) {
            where.OR = [
                { name: { path: ['uz'], string_contains: q as string, mode: 'insensitive' } },
                { name: { path: ['ru'], string_contains: q as string, mode: 'insensitive' } },
                { name: { path: ['en'], string_contains: q as string, mode: 'insensitive' } },
            ];
        }

        if (category_id) {
            const categoryIds = (category_id as string).split(',').map(Number);
            where.categories = {
                some: {
                    id: { in: categoryIds }
                }
            };
        }

        const skip = (Number(page) - 1) * Number(limit);
        const take = Number(limit);

        const orderBy: any = {};
        if (sortBy) {
            orderBy[sortBy as string] = sortOrder === 'desc' ? 'desc' : 'asc';
        } else {
            orderBy.createdAt = 'desc';
        }

        const [products, total] = await Promise.all([
            prisma.products.findMany({
                where,
                include: {
                    categories: true,
                    sizes: true,
                    colors: true,
                },
                orderBy,
                skip,
                take,
            }),
            prisma.products.count({ where })
        ]);

        return res.status(200).json({
            data: products,
            meta: {
                total,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(total / Number(limit))
            }
        });
    } catch (error) {
        next(error);
    }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const product = await prisma.products.findUnique({
            where: { id: Number(id) },
            include: {
                categories: true,
                sizes: true,
                colors: true,
            }
        });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await prisma.products.delete({
            where: { id: Number(id) }
        });
        return res.status(200).json({
            message: "Product deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { translations } = req.body;

        const category = await prisma.categories.create({
            data: {
                categoryTranslations: {
                    create: translations
                }
            }
        });

        return res.status(201).json({
            ok: true,
            message: "Category created successfully",
            category
        });
    } catch (error) {
        next(error);
    }
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { translations } = req.body;

        const category = await prisma.categories.update({
            where: {
                id: Number(id)
            },
            data: {
                categoryTranslations: {
                    update: translations
                }
            }
        });

        return res.status(200).json({
            ok: true,
            message: "Category updated successfully",
            category
        });
    } catch (error) {
        next(error);
    }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await prisma.categories.delete({
            where: { id: Number(id) }
        });
        return res.status(200).json({
            message: "Category deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { q } = req.query;
        const where: any = {};
        if (q) {
            where.OR = [
                { name: { path: ['uz'], string_contains: q as string, mode: 'insensitive' } },
                { name: { path: ['ru'], string_contains: q as string, mode: 'insensitive' } },
                { name: { path: ['en'], string_contains: q as string, mode: 'insensitive' } },
            ];
        }
        const categories = await prisma.categories.findMany({ where });
        return res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
};

export const getSizes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sizes = await prisma.sizes.findMany();
        return res.status(200).json(sizes);
    } catch (error) {
        next(error);
    }
};

export const getColors = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const colors = await prisma.colors.findMany();
        return res.status(200).json(colors);
    } catch (error) {
        next(error);
    }
};
