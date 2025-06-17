import { Router } from "express";
import { 
    createVariant, 
    deleteVariant, 
    getAllVariant, 
    getDetailVariant, 
    restoreVariant, 
    softDeleteVariant, 
    updateVariant 
} from "./variant.controller.js";

const variantRoutes = Router();

// * Thêm mới variant
variantRoutes.post('/', createVariant);

// * Lấy tất cả variants
variantRoutes.get('/', getAllVariant);

// * Lấy chi tiết variant
variantRoutes.get('/:id', getDetailVariant);

// * Sửa variant
variantRoutes.put('/:id', updateVariant);

// * Xoá variant
variantRoutes.delete('/:id', deleteVariant);

// * Xoá mềm variant
variantRoutes.delete('/soft/:id', softDeleteVariant);

// * Khôi phục variant
variantRoutes.patch('/restore/:id', restoreVariant);

export default variantRoutes; 