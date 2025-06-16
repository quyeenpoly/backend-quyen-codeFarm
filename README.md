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
