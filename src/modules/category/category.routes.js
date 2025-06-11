import { Router } from "express";
import { createCategory, deleteCategory, getAllCategory, getDetailCategory, restoreCategory, softDeleteCategory, updateCategory } from "./category.controller.js";

const categoryRoutes = Router();

categoryRoutes.post('/', createCategory);
categoryRoutes.get('/', getAllCategory);
categoryRoutes.get('/:id', getDetailCategory);
categoryRoutes.patch('/:id', updateCategory);
categoryRoutes.delete('/:id', deleteCategory);
categoryRoutes.delete('/soft-delete/:id', softDeleteCategory);
categoryRoutes.patch('/restore/:id', restoreCategory);

export default categoryRoutes;