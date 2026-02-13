import type { NextFunction, Request, Response } from "express";
import { prisma } from "../db/client.js";

const localizeCategory = (c: any, lang: string) => ({
    ...c,
    name: c.translations?.find((t: any) => t.lang === lang)?.name || "",
    translations: undefined
});

export const getStyles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const languageCode = (req as any).languageCode || 'uz';
        const styles = await prisma.styles.findMany({
            include: {
                category: {
                    include: {
                        translations: true
                    }
                }
            }
        });

        const localizedStyles = styles.map(s => ({
            ...s,
            category: localizeCategory(s.category, languageCode)
        }));

        return res.status(200).json({
            ok: true,
            data: localizedStyles
        });
    } catch (error) {
        next(error);
    }
};

export const createStyle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { image, categoryId } = req.body;

        const style = await prisma.styles.create({
            data: {
                image,
                categoryId: Number(categoryId)
            },
            include: {
                category: {
                    include: {
                        translations: true
                    }
                }
            }
        });

        return res.status(201).json({
            ok: true,
            message: "Style created successfully",
            data: style
        });
    } catch (error) {
        next(error);
    }
};

export const deleteStyle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        await prisma.styles.delete({
            where: { id: Number(id) }
        });

        return res.status(200).json({
            ok: true,
            message: "Style deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};
