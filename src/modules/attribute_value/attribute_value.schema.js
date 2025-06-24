import { z } from 'zod';
const attributeValueSchema = z.object({
    value: z.string().min(1, "Giá trị là bắt buộc").max(100, "Giá trị phải ít hơn 100 ký tự"),
    valueCode: z.string().min(1, "Mã giá trị là bắt buộc").max(50, "Mã giá trị phải ít hơn 50 ký tự"),
    attributeId: z.string().min(1, "ID thuộc tính là bắt buộc"),
    deletedAt: z.date().nullable().optional(),
    deletedBy: z.string().optional(), // Chỉ sử dụng khi xóa mềm
}); 
export default attributeValueSchema;
