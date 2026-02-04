import { Router } from "express";
// @ts-ignore
import { validate } from "../middleware/validate.middleware.js";
import { createProductSchema, updateProductSchema } from "../validators/product.validator.js";
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getSizes,
    getColors
} from "../controllers/product.controller.js";

const router = Router();

router.get("/", getProducts);
router.get("/categories", getCategories);
router.post("/categories", createCategory);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);
router.get("/sizes", getSizes);
router.get("/colors", getColors);
router.get("/:id", getProductById);
router.post("/", validate(createProductSchema), createProduct);
router.put("/:id", validate(updateProductSchema), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
