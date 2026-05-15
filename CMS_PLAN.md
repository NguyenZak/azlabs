# AZLABS Premium CMS - Implementation Plan 🚀

Kế hoạch xây dựng hệ quản trị nội dung cao cấp tích hợp Supabase & Cloudinary.

## 🏗️ 1. Infrastructure (Hoàn thành 100%)
- [x] Khởi tạo Database Schema (SQL) trên Supabase.
- [x] Cài đặt dependencies (`@supabase/ssr`, `next-cloudinary`, `tiptap`).
- [x] Cấu hình biến môi trường (`.env.local`).
- [x] Thiết lập Supabase SSR Helpers (Server, Client, Middleware).
- [x] Bảo mật đường dẫn CMS: `/adminaz`.

## 🔐 2. Authentication & Layout (Hoàn thành 100%)
- [x] Giao diện đăng nhập Apple-style.
- [x] Sidebar navigation chuyên nghiệp.
- [x] Trang Dashboard Overview với các chỉ số thống kê.
- [x] Tích hợp Supabase Auth thực tế (Email/Password).
- [x] Bảo mật Middleware (Route protection).
- [x] Chức năng Đăng xuất (Sign Out).

## 📁 3. Modules Quản lý nội dung (Hoàn thành 100%)
Mọi mục đều hỗ trợ **Dual-Language (EN/VI)** và **SEO**.

### 💼 Projects (Dự án) - 100%
- [x] Giao diện danh sách dự án (Real-time).
- [x] Giao diện thêm/sửa dự án (Dual-input).
- [x] Tích hợp Cloudinary Upload Widget.
- [x] Logic lưu dữ liệu (Upsert) vào Supabase.

### 📝 Posts (Bài viết/SEO) - 100%
- [x] Giao diện danh sách bài viết.
- [x] Bảng cấu hình SEO (Meta Title/Description).
- [x] Tích hợp Rich Text Editor (Tiptap).
- [x] Logic lưu dữ liệu vào Supabase.

### 🛠️ Services & Features - 100%
- [x] Giao diện quản lý Dịch vụ.
- [x] Giao diện quản lý Tech Stack (Logo grid).
- [ ] Giao diện quản lý Features (Section).

## 🌐 4. Frontend Integration (Sắp tới)
- [ ] Chuyển đổi toàn bộ Website sang Dynamic Data (fetch từ Supabase).
- [ ] Xây dựng trang Blog chi tiết.
- [ ] Tối ưu hóa SEO Metadata tự động cho từng trang.

## 🚀 5. Deployment & Optimization
- [ ] Kiểm tra Performance (Lighthouse).
- [ ] Cấu hình Cloudinary Transformation cho ảnh.
- [ ] Deploy lên Vercel/Production.

---
**Ghi chú**: Mọi thay đổi về nội dung trong CMS sẽ được cập nhật Real-time lên website thông qua Next.js ISR.
