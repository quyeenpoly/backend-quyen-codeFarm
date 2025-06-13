import {Router} from "express";
import productRouter from "../modules/product/product.routes.js";
import categoryRoutes from "../modules/category/category.routes.js";
import subCategoryRoutes from "../modules/subcategory/subcategory.routes.js";

const router = Router();

router.use("/products", productRouter)
router.use("/categories", categoryRoutes)
router.use("/sub-categories", subCategoryRoutes);

export default router