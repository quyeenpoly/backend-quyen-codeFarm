import { Router } from "express";
import { 
    createAttributeValue, 
    deleteAttributeValue, 
    getAllAttributeValue, 
    getByAttribute,
    getDetailAttributeValue, 
    restoreAttributeValue, 
    softDeleteAttributeValue, 
    updateAttributeValue 
} from "./attribute_value.controller.js";

const attributeValueRoutes = Router();

// thêm mới attribute value
attributeValueRoutes.post('/', createAttributeValue);

// Lấy tất cả attribute values
attributeValueRoutes.get('/', getAllAttributeValue);

// Lấy attribute values theo attribute
attributeValueRoutes.get('/by-attribute/:attributeId', getByAttribute);

// Lấy chi tiết attribute value
attributeValueRoutes.get('/:id', getDetailAttributeValue);

// Sửa attribute value
attributeValueRoutes.patch('/:id', updateAttributeValue);

// Xoá attribute value
attributeValueRoutes.delete('/:id', deleteAttributeValue);

// Xoá mềm attribute value
attributeValueRoutes.delete('/soft/:id', softDeleteAttributeValue);

// Khôi phục attribute value
attributeValueRoutes.patch('/restore/:id', restoreAttributeValue);

export default attributeValueRoutes; 