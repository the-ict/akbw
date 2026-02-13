import type {
    NextFunction,
    Request,
    Response
} from "express";
import { prisma } from "../db/client.js";

const localizeCategory = (c: any, lang: string) => ({
    ...c,
    name: c.translations?.find((t: any) => t.lang === lang)?.name || "",
    translations: undefined
});

const localizeSize = (s: any, lang: string) => ({
    ...s,
    name: s.translations?.find((t: any) => t.lang === lang)?.name || "",
    translations: undefined
});


const localizeColor = (c: any, lang: string) => ({
    ...c,
    name: c.translations?.find((t: any) => t.lang === lang)?.name || "",
    translations: undefined
});


const localizeProduct = (p: any, lang: string) => ({
    ...p,
    name: p.translations?.find((t: any) => t.lang === lang)?.name || "",
    description: p.translations?.find((t: any) => t.lang === lang)?.description || "",
    translations: undefined,
    categories: p.categories?.map((c: any) => localizeCategory(c, lang)),
    sizes: p.sizes?.map((s: any) => localizeSize(s, lang)),
    colors: p.colors?.map((c: any) => localizeColor(c, lang)),
    rating: p.reviews?.reduce((acc: any, review: any) => acc + review.rating, 0) / p.reviews?.length,
});

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { q, category_id, color_id, size_id, min_price, max_price, sortBy, sortOrder, page = 1, limit = 10 } = req.query;
        const languageCode = (req as any).languageCode || 'uz';

        const where: any = { AND: [] };

        if (q) {
            where.AND.push({
                translations: {
                    some: {
                        name: { contains: q as string, mode: 'insensitive' }
                    }
                }
            });
        }


        if (category_id && (category_id as string).length > 0) {
            const categoryIds = (category_id as string).split(',').map(Number);
            where.AND.push({
                categories: {
                    some: {
                        id: { in: categoryIds }
                    }
                }
            });
        };

        if (color_id && (color_id as string).length > 0) {
            const colorIds = (color_id as string).split(',').map(Number);
            where.AND.push({
                colors: {
                    some: {
                        id: { in: colorIds }
                    }
                }
            });
        }

        if (size_id && (size_id as string).length > 0) {
            const sizeIds = (size_id as string).split(',').map(Number);
            where.AND.push({
                sizes: {
                    some: {
                        id: { in: sizeIds }
                    }
                }
            });
        }

        if (min_price || max_price) {
            const priceFilter: any = {};
            if (min_price) priceFilter.gte = Number(min_price);
            if (max_price) priceFilter.lte = Number(max_price);
            where.AND.push({ price: priceFilter });
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
                    categories: {
                        include: {
                            translations: { where: { lang: languageCode } }
                        }
                    },
                    sizes: {
                        include: {
                            translations: { where: { lang: languageCode } }
                        }
                    },
                    colors: {
                        include: {
                            translations: { where: { lang: languageCode } }
                        }
                    },
                    translations: { where: { lang: languageCode } },
                    reviews: true,
                },
                orderBy,
                skip,
                take,
            }),
            prisma.products.count({ where })
        ]);

        return res.status(200).json({
            data: products.map(p => localizeProduct(p, languageCode)),
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
        const languageCode = (req as any).languageCode || 'uz';

        const product = await prisma.products.findUnique({
            where: { id: Number(id) },
            include: {
                categories: {
                    include: {
                        translations: { where: { lang: languageCode } }
                    }
                },
                sizes: {
                    include: {
                        translations: { where: { lang: languageCode } }
                    }
                },
                colors: {
                    include: {
                        translations: { where: { lang: languageCode } }
                    }
                },
                translations: { where: { lang: languageCode } },
                reviews: true
            }
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json(localizeProduct(product, languageCode));
    } catch (error) {
        next(error);
    }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { price, product_images, categories, sizes, colors, translations } = req.body;
        const languageCode = (req as any).languageCode || 'uz';

        const product = await prisma.products.create({
            data: {
                price,
                product_images,
                categories: {
                    connect: categories.map((id: number) => ({ id }))
                },
                sizes: {
                    connect: sizes.map((id: number) => ({ id }))
                },
                colors: {
                    connect: colors.map((id: number) => ({ id }))
                },
                translations: {
                    create: translations
                }
            },
            include: {
                categories: {
                    include: {
                        translations: { where: { lang: languageCode } }
                    }
                },
                sizes: {
                    include: {
                        translations: { where: { lang: languageCode } }
                    }
                },
                colors: {
                    include: {
                        translations: { where: { lang: languageCode } }
                    }
                },
                translations: { where: { lang: languageCode } }
            }
        });

        return res.status(201).json({
            ok: true,
            message: "Product created successfully",
            product: localizeProduct(product, languageCode),
        });
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { price, product_images, categories, sizes, colors, translations } = req.body;
        const languageCode = (req as any).languageCode || 'uz';

        const data: any = {};
        if (price !== undefined) data.price = price;
        if (product_images !== undefined) data.product_images = product_images;

        if (categories) {
            data.categories = { set: categories.map((id: number) => ({ id })) };
        }
        if (sizes) {
            data.sizes = { set: sizes.map((id: number) => ({ id })) };
        }
        if (colors) {
            data.colors = { set: colors.map((id: number) => ({ id })) };
        }
        if (translations) {
            data.translations = {
                deleteMany: {},
                create: translations
            };
        }

        const product = await prisma.products.update({
            where: { id: Number(id) },
            data,
            include: {
                categories: {
                    include: {
                        translations: { where: { lang: languageCode } }
                    }
                },
                sizes: {
                    include: {
                        translations: { where: { lang: languageCode } }
                    }
                },
                colors: {
                    include: {
                        translations: { where: { lang: languageCode } }
                    }
                },
                translations: { where: { lang: languageCode } }
            }
        });

        return res.status(200).json({
            ok: true,
            message: "Product updated successfully",
            product: localizeProduct(product, languageCode),
        });
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        // Delete translations first if not handled by cascade
        await prisma.productTranslations.deleteMany({ where: { productId: Number(id) } });
        await prisma.products.delete({ where: { id: Number(id) } });
        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        next(error);
    }
};

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { translations } = req.body;
        const languageCode = (req as any).languageCode || 'uz';

        const category = await prisma.categories.create({
            data: {
                translations: {
                    create: translations
                }
            },
            include: {
                translations: { where: { lang: languageCode } }
            }
        });

        return res.status(201).json({
            ok: true,
            message: "Category created successfully",
            category: localizeCategory(category, languageCode)
        });
    } catch (error) {
        next(error);
    }
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { translations } = req.body;
        const languageCode = (req as any).languageCode || 'uz';

        const category = await prisma.categories.update({
            where: { id: Number(id) },
            data: {
                translations: {
                    deleteMany: {},
                    create: translations
                }
            },
            include: {
                translations: { where: { lang: languageCode } }
            }
        });

        return res.status(200).json({
            ok: true,
            message: "Category updated successfully",
            category: localizeCategory(category, languageCode)
        });
    } catch (error) {
        next(error);
    }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await prisma.categoryTranslations.deleteMany({ where: { categoryId: Number(id) } });
        await prisma.categories.delete({ where: { id: Number(id) } });
        return res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        next(error);
    }
};

export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const category = await prisma.categories.findUnique({
            where: { id: Number(id) },
            include: {
                translations: true
            }
        });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        return res.status(200).json(category);
    } catch (error) {
        next(error);
    }
};

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { q } = req.query;
        const languageCode = (req as any).languageCode || 'uz';
        const where: any = {};
        if (q) {
            where.translations = {
                some: {
                    name: { contains: q as string, mode: 'insensitive' }
                }
            };
        }
        const categories = await prisma.categories.findMany({
            where,
            include: {
                translations: { where: { lang: languageCode } }
            }
        });
        return res.status(200).json(categories.map(c => localizeCategory(c, languageCode)));
    } catch (error) {
        next(error);
    }
};

export const getSizes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const languageCode = (req as any).languageCode || 'uz';
        const sizes = await prisma.sizes.findMany({
            include: {
                translations: { where: { lang: languageCode } }
            }
        });
        return res.status(200).json(sizes.map(s => localizeSize(s, languageCode)));
    } catch (error) {
        next(error);
    }
};

export const getColors = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const languageCode = (req as any).languageCode || 'uz';
        const colors = await prisma.colors.findMany({
            include: {
                translations: { where: { lang: languageCode } }
            }
        });
        return res.status(200).json(colors.map(c => localizeColor(c, languageCode)));
    } catch (error) {
        next(error);
    }
};

export const createSize = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { translations } = req.body;
        const languageCode = (req as any).languageCode || 'uz';

        const size = await prisma.sizes.create({
            data: {
                translations: {
                    create: translations
                }
            },
            include: {
                translations: { where: { lang: languageCode } }
            }
        });

        return res.status(201).json({
            ok: true,
            message: "Size created successfully",
            size: localizeSize(size, languageCode)
        });
    } catch (error) {
        next(error);
    }
};

export const createColor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { translations } = req.body;
        const languageCode = (req as any).languageCode || 'uz';

        const color = await prisma.colors.create({
            data: {
                translations: {
                    create: translations
                }
            },
            include: {
                translations: { where: { lang: languageCode } }
            }
        });

        return res.status(201).json({
            ok: true,
            message: "Color created successfully",
            color: localizeColor(color, languageCode)
        });
    } catch (error) {
        next(error);
    }
};


export const recommendedAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const now = new Date();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(now.getDate() - 30);

        const newestProducts = await prisma.products.findMany({
            where: {
                createdAt: {
                    gte: thirtyDaysAgo,
                    lte: now,
                }
            },
            include: {
                translations: true,
                categories: {
                    include: {
                        translations: true
                    }
                },
                reviews: true
            }
        });

        const allOrders = await prisma.orders.findMany({
            select: { items: true }
        });

        const soldCount: Record<number, number> = {};
        allOrders.forEach(order => {
            order.items.forEach(itemId => {
                soldCount[itemId] = (soldCount[itemId] || 0) + 1;
            });
        });

        const topSoldIds = Object.entries(soldCount)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10)
            .map(([id]) => Number(id));

        const mostSoldProducts = await prisma.products.findMany({
            where: {
                id: { in: topSoldIds }
            },
            include: {
                translations: true,
                categories: {
                    include: {
                        translations: true
                    }
                },
                reviews: true
            }
        });

        const sortedMostSold = mostSoldProducts.sort((a, b) => (soldCount[b.id] || 0) - (soldCount[a.id] || 0));

        return res.status(200).json({
            ok: true,
            newest: newestProducts,
            mostSold: sortedMostSold
        });
    } catch (error) {
        next(error);
    }
}