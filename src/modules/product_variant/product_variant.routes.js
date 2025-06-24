import { Router } from "express";
import { 
    createProductVariant, 
    deleteProductVariant, 
    getAllProductVariant, 
    getDetailProductVariant, 
    restoreProductVariant, 
    softDeleteProductVariant, 
    updateProductVariant, 
} from "./product_variant.controller.js";
import validBodyRequest from "../../common/middlewares/validBodyRequest.js";
import variantSchema from "./product_variant.schema.js";

const variantRoutes = Router();
// * Lấy tất cả variants
variantRoutes.get('/', getAllProductVariant);

// * Lấy chi tiết variant
variantRoutes.get('/:id', getDetailProductVariant);

// ! Chỉ admin mới được truy cập
// * Xoá variant
variantRoutes.delete('/:id', deleteProductVariant);

// * Xoá mềm variant
variantRoutes.delete('/soft/:id', softDeleteProductVariant);

// * Khôi phục variant
variantRoutes.patch('/restore/:id', restoreProductVariant);

// * Middleware để xác thực body request
variantRoutes.use(validBodyRequest(variantSchema))
// * Thêm mới variant
variantRoutes.post('/', createProductVariant);
// * Sửa variant
variantRoutes.put('/:id', updateProductVariant);


export default variantRoutes; 