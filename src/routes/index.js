import {Router} from "express"
import productRouter from "./productRoutes.js";
import categoryRoutes from "./categoryRoutes.js";

const router = Router();

router.use("/products", productRouter)
router.use("/categories", categoryRoutes)

export default router