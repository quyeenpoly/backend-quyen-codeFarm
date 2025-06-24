
import { z } from 'zod';
const variantSchema = z.object({
    title: z.string().min(1, "Tiêu đề là bắt buộc").max(200, "Tiêu đề phải ít hơn 200 ký tự"),
    thumbnail: z.string().url("Thumbnail phải là một URL hợp lệ"),
    price: z.number().min(0, "Giá phải lớn hơn hoặc bằng 0"),
    oldPrice: z.number().nullable().optional(),
    sku: z.string().min(1, "SKU là bắt buộc").max(100, "SKU phải ít hơn 100 ký tự"),
    stock: z.number().min(0, "Số lượng tồn kho phải lớn hơn hoặc bằng 0").default(0),
    productId: z.string().min(1, "ID sản phẩm là bắt buộc"),
    attributeId: z.string().min(1, "ID thuộc tính là bắt buộc"),
    attributeValueId: z.string().min(1, "ID giá trị thuộc tính là bắt buộc"),

    deletedAt: z.date().nullable().optional(),
    deletedBy: z.string().optional(), // Chỉ sử dụng khi xóa mềm
});
export default variantSchema;