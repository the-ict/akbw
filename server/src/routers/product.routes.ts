import {
    Router
} from "express";
// @ts-ignore
import {
    validate
} from "../middleware/validate.middleware.js";
import {
    categoriesSchema,
    categoriesUpdateSchema,
    createProductSchema,
    updateProductSchema
} from "../validators/product.validator.js";
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
    getCategoryById,
    getSizes,
    getColors,
    createSize,
    createColor,
    recomentAll
} from "../controllers/product.controller.js";


import {
    langaugeMiddleware
} from "../middleware/language.middleware.js";

const router = Router();

router.get("/", langaugeMiddleware, getProducts);
router.get("/categories", langaugeMiddleware, getCategories);
router.get("/categories/:id", getCategoryById);

router.post("/categories", validate(categoriesSchema), createCategory);
router.put("/categories/:id", langaugeMiddleware, validate(categoriesUpdateSchema), updateCategory);
router.delete("/categories/:id", deleteCategory);
router.get("/sizes", langaugeMiddleware, getSizes);
router.post("/sizes", createSize);
router.get("/colors", langaugeMiddleware, getColors);
router.post("/colors", createColor);

router.get("/recomended/all", recomentAll);
router.get("/:id", langaugeMiddleware, getProductById);
router.post("/", validate(createProductSchema), createProduct);
router.put("/:id", validate(updateProductSchema), updateProduct);
router.delete("/:id", deleteProduct);


export default router;
