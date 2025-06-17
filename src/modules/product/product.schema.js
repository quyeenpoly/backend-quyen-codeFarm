import { z } from "zod";

const productSchema = z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title must be a string"
    }).min(3, "Title must be at least 3 characters"),
    
    thumbnail: z.string({
        required_error: "Thumbnail is required",
        invalid_type_error: "Thumbnail must be a string"
    }),
    
    description: z.string().optional(),
    
    shortDescription: z.string().optional(),
    
    specifications: z.record(z.any()).optional(),
    
    priceDefault: z.number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number"
    }).min(0, "Price must be greater than or equal to 0"),
    
    slug: z.string({
        required_error: "Slug is required",
        invalid_type_error: "Slug must be a string"
    }).min(3, "Slug must be at least 3 characters"),
    
    brandId: z.string({
        required_error: "Brand ID is required",
        invalid_type_error: "Brand ID must be a string"
    }).regex(/^[0-9a-fA-F]{24}$/, "Invalid brand ID format"),
    
    subCategoryId: z.string({
        required_error: "SubCategory ID is required",
        invalid_type_error: "SubCategory ID must be a string"
    }).regex(/^[0-9a-fA-F]{24}$/, "Invalid subcategory ID format"),
    
    soldCount: z.number().optional().default(0),
    
    variants: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid variant ID format")).optional(),
    
    seoTitle: z.string().optional(),
    
    seoDescription: z.string().optional(),
    
    tags: z.array(z.string()).optional().default([]),
    
    deletedAt: z.date().nullable().optional(),
    
    deletedBy: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID format").optional()
});

// Schema cho việc cập nhật sản phẩm (cho phép một số trường không bắt buộc)
const updateProductSchema = productSchema.partial();

// Schema cho việc tạo sản phẩm mới (yêu cầu các trường bắt buộc)
const createProductSchema = productSchema.omit({ 
    deletedAt: true, 
    deletedBy: true,
    soldCount: true,
    variants: true
});

export { createProductSchema, updateProductSchema };
export default productSchema; 