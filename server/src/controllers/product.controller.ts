import type { NextFunction, Request, Response } from "express";
import { prisma } from "../db/client.js";

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { q, category_id, sortBy, sortOrder, page = 1, limit = 10 } = req.query;

        const where: any = {};

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
        const { name, price, product_images, category_id, size_id, color_id } = req.body;
        const product = await prisma.products.create({
            data: {
                name: name as any,
                price,
                product_images,
                categories: {
                    connect: category_id.map((id: number) => ({ id }))
                },
                sizes: {
                    connect: size_id.map((id: number) => ({ id }))
                },
                colors: {
                    connect: color_id.map((id: number) => ({ id }))
                },
            },
            include: {
                categories: true,
                sizes: true,
                colors: true,
            }
        });
        return res.status(201).json({
            message: "Product created successfully",
            product,
        });
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { name, price, product_images, category_id, size_id, color_id } = req.body;

        const updateData: any = {
            name: name as any,
            price,
            product_images,
        };

        if (category_id) {
            updateData.categories = {
                set: category_id.map((id: number) => ({ id }))
            };
        }
        if (size_id) {
            updateData.sizes = {
                set: size_id.map((id: number) => ({ id }))
            };
        }
        if (color_id) {
            updateData.colors = {
                set: color_id.map((id: number) => ({ id }))
            };
        }

        const product = await prisma.products.update({
            where: { id: Number(id) },
            data: updateData,
            include: {
                categories: true,
                sizes: true,
                colors: true,
            }
        });
        return res.status(200).json({
            message: "Product updated successfully",
            product,
        });
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
        const { name } = req.body; // Expecting { uz, ru, en }
        const category = await prisma.categories.create({
            data: { name: name as any }
        });
        return res.status(201).json({
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
        const { name } = req.body;
        const category = await prisma.categories.update({
            where: { id: Number(id) },
            data: { name: name as any }
        });
        return res.status(200).json({
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
