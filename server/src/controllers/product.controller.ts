import type { NextFunction, Request, Response } from "express";
import { prisma } from "../db/client.js";

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await prisma.products.findMany({
            include: {
                categories: true,
                sizes: true,
                colors: true,
            }
        });
        return res.status(200).json(products);
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
                name,
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
            name,
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

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await prisma.categories.findMany();
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
