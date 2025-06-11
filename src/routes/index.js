import {Router} from "express";
import productRouter from "../modules/product/product.routes.js";
import categoryRoutes from "../modules/category/category.routes.js";

const router = Router();

router.use("/products", productRouter)
router.use("/categories", categoryRoutes)

export default router