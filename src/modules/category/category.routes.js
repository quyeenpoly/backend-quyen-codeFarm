import { Router } from "express";
import { createCategory, deleteCategory, getAllCategory, getDetailCategory, restoreCategory, softDeleteCategory, updateCategory } from "./category.controller.js";
import validBodyRequest from "../../common/middlewares/validBodyRequest.js";
import categorySchema from "./category.schema.js";

const categoryRoutes = Router();


categoryRoutes.get('/', getAllCategory);
categoryRoutes.get('/:id', getDetailCategory);

categoryRoutes.delete('/:id', deleteCategory);
categoryRoutes.delete('/soft-delete/:id', softDeleteCategory);
categoryRoutes.patch('/restore/:id', restoreCategory);

// Validate phải chạy qua đây pass mới thêm và sửa được
categoryRoutes.use(validBodyRequest(categorySchema))
// tương đương categoryRoutes.post('/', validBodyRequest(categorySchema), createCategory);

categoryRoutes.post('/', createCategory);
categoryRoutes.patch('/:id', updateCategory);
export default categoryRoutes;