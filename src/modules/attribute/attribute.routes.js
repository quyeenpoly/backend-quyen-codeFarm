import { Router } from "express";
import validBodyRequest from '../../common/middlewares/validBodyRequest.js';
import { 
    createAttribute, 
    deleteAttribute, 
    getAllAttribute, 
    getDetailAttribute, 
    restoreAttribute, 
    softDeleteAttribute, 
    updateAttribute,
} from "./attribute.controller.js";
import attributeSchema from "./attribute.schema.js";

const attributeRoutes = Router();
// Lấy tất cả attribute
attributeRoutes.get('/', getAllAttribute);

// Lấy chi tiết attribute
attributeRoutes.get('/:id', getDetailAttribute);

// ! la admin moi duoc truy cap
// Xoá attribute
attributeRoutes.delete('/:id', deleteAttribute);

// Xoá mềm attribute
attributeRoutes.delete('/soft-delete/:id', softDeleteAttribute);

// Khôi phục attribute
attributeRoutes.patch('/restore/:id', restoreAttribute);

attributeRoutes.use(validBodyRequest(attributeSchema))
// Thêm mới attribute
attributeRoutes.post('/', createAttribute);
// Sửa attribute
attributeRoutes.put('/:id', updateAttribute);



export default attributeRoutes; 