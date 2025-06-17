import {Router} from "express";
import productRouter from "../modules/product/product.routes.js";
import categoryRoutes from "../modules/category/category.routes.js";
import subCategoryRoutes from "../modules/subcategory/subcategory.routes.js";
import brandRoutes from "../modules/brand/brand.routes.js";
import attributeRoutes from "../modules/attribute/attribute.routes.js";
import attributeValueRoutes from "../modules/attribute_value/attribute_value.routes.js";
import variantRoutes from "../modules/variant/variant.routes.js";

const router = Router();

router.use("/products", productRouter)
router.use("/categories", categoryRoutes)
router.use("/sub-categories", subCategoryRoutes);
router.use("/brands", brandRoutes);
router.use("/attributes", attributeRoutes);
router.use("/attribute-values", attributeValueRoutes);
router.use("/variants", variantRoutes);

export default router