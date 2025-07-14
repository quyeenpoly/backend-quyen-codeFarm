import {Router} from "express";
import productRouter from "../modules/product/product.routes.js";
import categoryRoutes from "../modules/category/category.routes.js";
import subCategoryRoutes from "../modules/subcategory/subcategory.routes.js";
import brandRoutes from "../modules/brand/brand.routes.js";
import attributeRoutes from "../modules/attribute/attribute.routes.js";
import attributeValueRoutes from "../modules/attribute_value/attribute_value.routes.js";
import variantRoutes from "../modules/product_variant/product_variant.routes.js";
import authRoutes from "../modules/auth/auth.router.js";
import { verifyUser } from "../common/middlewares/verifyUser.js";
import cartRouter from "../modules/cart/cart.routes.js";
import orderRoute from "../modules/order/order.routes.js";
const router = Router();

router.use("/products", productRouter)
router.use("/categories", categoryRoutes)
router.use("/sub-categories", subCategoryRoutes);
router.use("/brands", brandRoutes);
router.use("/attributes", attributeRoutes);
router.use("/attribute-values", attributeValueRoutes);
router.use("/product-variants", variantRoutes);
router.use("/auth", authRoutes);
router.use("/cart", verifyUser, cartRouter);
router.use("/orders", orderRoute); 


export default router