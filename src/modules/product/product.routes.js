import { Router } from "express";
import { 
    createProduct, 
    deleteProduct, 
    getAllProducts, 
    getDetailProduct, 
    restoreProduct, 
    softDeleteProduct, 
    updateProduct 
} from "./product.controller.js";
import validBodyRequest from "../../common/middlewares/validBodyRequest.js";
import { createProductSchema, updateProductSchema } from "./product.schema.js";

const productRoutes = Router();

// Create product
productRoutes.post('/', validBodyRequest(createProductSchema), createProduct);

// Get all products
productRoutes.get('/', getAllProducts);

// Get detail product
productRoutes.get('/:id', getDetailProduct);

// Update product
productRoutes.put('/:id', validBodyRequest(updateProductSchema), updateProduct);

// Delete product
productRoutes.delete('/:id', deleteProduct);

// Soft delete product
productRoutes.delete('/soft/:id', softDeleteProduct);

// Restore product
productRoutes.patch('/restore/:id', restoreProduct);

export default productRoutes;