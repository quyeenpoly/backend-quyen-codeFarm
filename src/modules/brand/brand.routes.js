import { Router } from "express";
import { 
    createBrand, 
    deleteBrand, 
    getAllBrand, 
    getDetailBrand, 
    restoreBrand, 
    softDeleteBrand, 
    updateBrand 
} from "./brand.controller.js";
import validBodyRequest from "../../common/middlewares/validBodyRequest.js";
import brandSchema from "./brand.schema.js";

const brandRoutes = Router();

// Get all brands
brandRoutes.get('/', getAllBrand);
// Get detail brand
brandRoutes.get('/:id', getDetailBrand);
// Delete brand
brandRoutes.delete('/:id', deleteBrand);
// Soft delete brand
brandRoutes.delete('/soft-delete/:id', softDeleteBrand);
// Restore brand
brandRoutes.patch('/restore/:id', restoreBrand);

brandRoutes.use(validBodyRequest(brandSchema));
// Create brand
brandRoutes.post('/', createBrand);
// Update brand
brandRoutes.patch('/:id', updateBrand);

export default brandRoutes; 