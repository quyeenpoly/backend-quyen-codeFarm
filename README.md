## 📑 Quy ước đặt tên Branch & Commit

### 1. Đặt tên nhánh (Branch Naming)

| Loại nhánh   | Mục đích                | Ví dụ                     |
|--------------|-------------------------|---------------------------|
| `feature`    | Thêm tính năng mới      | `feature/login-page-123`  |
| `bugfix`     | Sửa lỗi                 | `bugfix/fix-auth-99`      |
| `hotfix`     | Sửa lỗi khẩn cấp (prod) | `hotfix/crash-home-101`   |
| `refactor`   | Cải tiến cấu trúc code  | `refactor/user-service-56`|
| `docs`       | Cập nhật tài liệu       | `docs/update-readme-12`   |

---

### 2. Đặt tên commit (Commit Message)

| Loại commit | Mục đích                 | Ví dụ                                   |
|-------------|--------------------------|-----------------------------------------|
| `feat`      | Thêm tính năng           | `feat(auth): thêm đăng nhập Google`     |
| `fix`       | Sửa lỗi                  | `fix(api): xử lý lỗi 500`               |
| `refactor`  | Cải tiến code            | `refactor: tách middleware thành module`|
| `docs`      | Cập nhật tài liệu        | `docs: bổ sung hướng dẫn cài đặt`       |
| `test`      | Thêm/chỉnh sửa test      | `test: thêm unit test cho auth`         |
| `chore`     | Công việc phụ trợ khác   | `chore: update dependencies`            |

# E-commerce API Documentation

## Cài đặt và Chạy dự án

1. Clone dự án:
```bash
git clone <repository-url>
cd <project-folder>
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Tạo file .env:
```env
DB_URI=mongodb://localhost:27017/ecommerce
HOST=localhost
PORT=5000
```

4. Chạy dự án:
```bash
npm run dev
```

## Hướng dẫn test API với Postman

### 1. Brand (Thương hiệu)

#### Tạo thương hiệu
```http
POST http://localhost:5000/api/brands
Content-Type: application/json

{
    "title": "Apple",
    "description": "Apple Inc. - Công ty công nghệ hàng đầu",
    "slug": "apple"
}
```

```http
POST http://localhost:5000/api/brands
Content-Type: application/json

{
    "title": "Samsung",
    "description": "Samsung Electronics - Tập đoàn điện tử hàng đầu",
    "slug": "samsung"
}
```

### 2. Category (Danh mục)

#### Tạo danh mục
```http
POST http://localhost:5000/api/categories
Content-Type: application/json

{
    "title": "Điện thoại",
    "description": "Danh mục điện thoại di động",
    "slug": "dien-thoai"
}
```

```http
POST http://localhost:5000/api/categories
Content-Type: application/json

{
    "title": "Laptop",
    "description": "Danh mục laptop",
    "slug": "laptop"
}
```

### 3. SubCategory (Danh mục con)

#### Tạo danh mục con (Thay ID_CATEGORY bằng ID thực từ bước 2)
```http
POST http://localhost:5000/api/sub-categories
Content-Type: application/json

{
    "title": "iPhone",
    "description": "Các dòng điện thoại iPhone",
    "slug": "iphone",
    "categoryId": "ID_CATEGORY"
}
```

```http
POST http://localhost:5000/api/sub-categories
Content-Type: application/json

{
    "title": "Samsung Galaxy",
    "description": "Các dòng điện thoại Samsung Galaxy",
    "slug": "samsung-galaxy",
    "categoryId": "ID_CATEGORY"
}
```

### 4. Attribute (Thuộc tính)

#### Tạo thuộc tính
```http
POST http://localhost:5000/api/attributes
Content-Type: application/json

{
    "name": "Màu sắc",
    "attributeCode": "COLOR",
    "slug": "mau-sac",
    "description": "Màu sắc sản phẩm"
}
```

```http
POST http://localhost:5000/api/attributes
Content-Type: application/json

{
    "name": "Dung lượng",
    "attributeCode": "STORAGE",
    "slug": "dung-luong",
    "description": "Dung lượng bộ nhớ"
}
```

### 5. Attribute Value (Giá trị thuộc tính)

#### Tạo giá trị thuộc tính (Thay ID_ATTRIBUTE bằng ID thực từ bước 4)
```http
POST http://localhost:5000/api/attribute-values
Content-Type: application/json

{
    "title": "Màu Đen",
    "slug": "mau-den",
    "value": "Đen",
    "attributeId": "ID_ATTRIBUTE"
}
```

```http
POST http://localhost:5000/api/attribute-values
Content-Type: application/json

{
    "title": "128GB",
    "slug": "128gb",
    "value": "128GB",
    "attributeId": "ID_ATTRIBUTE"
}
```

### 6. Product (Sản phẩm)

#### Tạo sản phẩm (Thay các ID bằng ID thực từ các bước trước)
```http
POST http://localhost:5000/api/products
Content-Type: application/json

{
    "title": "iPhone 15 Pro Max",
    "thumbnail": "https://example.com/iphone15.jpg",
    "description": "iPhone 15 Pro Max mới nhất từ Apple",
    "shortDescription": "iPhone 15 Pro Max",
    "specifications": {
        "screen": "6.7 inch OLED",
        "chip": "A17 Pro",
        "camera": "48MP"
    },
    "priceDefault": 34990000,
    "slug": "iphone-15-pro-max",
    "brandId": "ID_BRAND",
    "subCategoryId": "ID_SUBCATEGORY",
    "seoTitle": "iPhone 15 Pro Max - Điện thoại cao cấp từ Apple",
    "seoDescription": "Mua iPhone 15 Pro Max chính hãng",
    "tags": ["iphone", "apple", "smartphone"]
}
```

### 7. Variant (Biến thể sản phẩm)

#### Tạo biến thể (Thay các ID bằng ID thực từ các bước trước)
```http
POST http://localhost:5000/api/variants
Content-Type: application/json

{
    "title": "iPhone 15 Pro Max 128GB Đen",
    "thumbnail": "https://example.com/iphone15-black-128.jpg",
    "productId": "ID_PRODUCT",
    "attributeId": "ID_ATTRIBUTE",
    "attributeValueId": "ID_ATTRIBUTE_VALUE",
    "sku": "IPH15PM-128GB-BLACK",
    "price": 34990000,
    "stock": 100,
    "status": 1
}
```

## API Endpoints

### Brands
- GET `/api/brands` - Lấy danh sách thương hiệu
- GET `/api/brands/:id` - Lấy chi tiết thương hiệu
- POST `/api/brands` - Tạo thương hiệu mới
- PUT `/api/brands/:id` - Cập nhật thương hiệu
- DELETE `/api/brands/:id` - Xóa thương hiệu
- DELETE `/api/brands/soft/:id` - Xóa mềm thương hiệu
- PATCH `/api/brands/restore/:id` - Khôi phục thương hiệu

### Categories
- GET `/api/categories` - Lấy danh sách danh mục
- GET `/api/categories/:id` - Lấy chi tiết danh mục
- POST `/api/categories` - Tạo danh mục mới
- PUT `/api/categories/:id` - Cập nhật danh mục
- DELETE `/api/categories/:id` - Xóa danh mục
- DELETE `/api/categories/soft/:id` - Xóa mềm danh mục
- PATCH `/api/categories/restore/:id` - Khôi phục danh mục

### SubCategories
- GET `/api/sub-categories` - Lấy danh sách danh mục con
- GET `/api/sub-categories/:id` - Lấy chi tiết danh mục con
- POST `/api/sub-categories` - Tạo danh mục con mới
- PUT `/api/sub-categories/:id` - Cập nhật danh mục con
- DELETE `/api/sub-categories/:id` - Xóa danh mục con
- DELETE `/api/sub-categories/soft/:id` - Xóa mềm danh mục con
- PATCH `/api/sub-categories/restore/:id` - Khôi phục danh mục con

### Attributes
- GET `/api/attributes` - Lấy danh sách thuộc tính
- GET `/api/attributes/:id` - Lấy chi tiết thuộc tính
- POST `/api/attributes` - Tạo thuộc tính mới
- PUT `/api/attributes/:id` - Cập nhật thuộc tính
- DELETE `/api/attributes/:id` - Xóa thuộc tính
- DELETE `/api/attributes/soft/:id` - Xóa mềm thuộc tính
- PATCH `/api/attributes/restore/:id` - Khôi phục thuộc tính

### Attribute Values
- GET `/api/attribute-values` - Lấy danh sách giá trị thuộc tính
- GET `/api/attribute-values/:id` - Lấy chi tiết giá trị thuộc tính
- GET `/api/attribute-values/by-attribute/:attributeId` - Lấy giá trị theo thuộc tính
- POST `/api/attribute-values` - Tạo giá trị thuộc tính mới
- PUT `/api/attribute-values/:id` - Cập nhật giá trị thuộc tính
- DELETE `/api/attribute-values/:id` - Xóa giá trị thuộc tính
- DELETE `/api/attribute-values/soft/:id` - Xóa mềm giá trị thuộc tính
- PATCH `/api/attribute-values/restore/:id` - Khôi phục giá trị thuộc tính

### Products
- GET `/api/products` - Lấy danh sách sản phẩm
- GET `/api/products/:id` - Lấy chi tiết sản phẩm
- POST `/api/products` - Tạo sản phẩm mới
- PUT `/api/products/:id` - Cập nhật sản phẩm
- DELETE `/api/products/:id` - Xóa sản phẩm
- DELETE `/api/products/soft/:id` - Xóa mềm sản phẩm
- PATCH `/api/products/restore/:id` - Khôi phục sản phẩm

### Variants
- GET `/api/variants` - Lấy danh sách biến thể
- GET `/api/variants/:id` - Lấy chi tiết biến thể
- POST `/api/variants` - Tạo biến thể mới
- PUT `/api/variants/:id` - Cập nhật biến thể
- DELETE `/api/variants/:id` - Xóa biến thể
- DELETE `/api/variants/soft/:id` - Xóa mềm biến thể
- PATCH `/api/variants/restore/:id` - Khôi phục biến thể

## Lưu ý quan trọng

1. Thứ tự tạo dữ liệu:
   - Brand -> Category -> SubCategory
   - Attribute -> Attribute Value
   - Product (cần Brand và SubCategory)
   - Variant (cần Product và Attribute Value)

2. Lưu ý ID:
   - Sau mỗi bước tạo, lưu lại ID được trả về
   - Thay thế các ID mẫu bằng ID thực từ database
   - Đảm bảo ID tồn tại trước khi sử dụng

3. Kiểm tra:
   - Kiểm tra response sau mỗi request
   - Xác nhận dữ liệu được tạo thành công
   - Kiểm tra các mối quan hệ giữa các đối tượng

4. Swagger Documentation:
   - Truy cập: `http://localhost:5000/api-docs`
   - Xem chi tiết các API và schema
