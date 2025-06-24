import {z} from 'zod';

const attributeSchema = z.object({
    name: z.string().min(1, "Tên thuộc tính là bắt buộc").max(100, "Tên thuộc tính phải ít hơn 100 ký tự"),
    attributeCode: z.string().min(1, "Attribute code là bắt buộc").max(50, "Attribute code phải ít hơn 50 ký tự"),
    slug: z.string().min(1, "Slug là bắt buộc").max(100, "Slug phải ít hơn 100 ký tự"),
    values: z.array(z.string()).optional(),
    description: z.string().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    tags: z.array(z.string()).optional(),

    deletedAt: z.date().nullable().optional(),
    deletedBy: z.string().optional(), // Chỉ sử dụng khi xóa mềm
});

export default attributeSchema;
