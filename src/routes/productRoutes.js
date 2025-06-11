import {Router} from "express"
import { createProducts, deleteProducts, getAllProducts, getDetailProducts, updateProducts } from "../controllers/productController.js";

const productRouter = Router();

productRouter.get("/", getAllProducts)
productRouter.get("/:id", getDetailProducts)
productRouter.post("/", createProducts)
productRouter.patch("/:id", updateProducts)
productRouter.delete("/:id", deleteProducts)

export default productRouter;