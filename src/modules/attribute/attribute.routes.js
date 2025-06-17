import { Router } from "express";
import { 
    createAttribute, 
    deleteAttribute, 
    getAllAttribute, 
    getDetailAttribute, 
    restoreAttribute, 
    softDeleteAttribute, 
    updateAttribute 
} from "./attribute.controller.js";

const attributeRoutes = Router();

// Thêm mới attribute
attributeRoutes.post('/', createAttribute);

// Lấy tất cả attribute
attributeRoutes.get('/', getAllAttribute);

// Lấy chi tiết attribute
attributeRoutes.get('/:id', getDetailAttribute);

// Sửa attribute
attributeRoutes.put('/:id', updateAttribute);

// Xoá attribute
attributeRoutes.delete('/:id', deleteAttribute);

// Xoá mềm attribute
attributeRoutes.delete('/soft-delete/:id', softDeleteAttribute);

// Khôi phục attribute
attributeRoutes.patch('/restore/:id', restoreAttribute);

export default attributeRoutes; 