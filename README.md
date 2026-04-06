# CC_Tools_CHeckin

HƯỚNG DẪN SỬ DỤNG TOOL CCTOOLS AUTO CHECK-IN (A-Z)

1. CÀI ĐẶT MÔI TRƯỜNG & THƯ VIỆN
- Yêu cầu máy tính cài đặt sẵn NodeJS.
- Mở Terminal (CMD) tại thư mục chứa tool và chạy lệnh cài đặt:
npm install axios fs-extra https-proxy-agent colors luxon uuid

2. DANH SÁCH CÁC FILE TRONG THƯ MỤC TOOL
- index.js: File chạy tool chính (thực hiện check-in).
- token.js: File hỗ trợ lọc và chuyển đổi token từ Cookie sang định dạng chuẩn.
- code.txt: File chứa dữ liệu Cookie thô copy từ trình duyệt (mỗi nick 1 dòng).
- token.txt: File chứa dữ liệu đã lọc định dạng "Refresh_Token|Access_Token" (tự động tạo).
- proxy.txt: File chứa danh sách Proxy (định dạng http://user:pass@ip:port hoặc http://ip:port).
- User_agents.txt: File chứa danh sách User-Agent (mỗi dòng 1 cái).
- last_index.txt: File lưu vị trí ví đang chạy để chạy tiếp khi tool bị tắt (tự động tạo).
- profiles.json: File lưu thông tin cấu hình cố định của từng tài khoản (tự động tạo).

3. CÁCH LẤY TOKEN (COOKIE) CHUẨN ĐỂ LỌC
- Bước 1: Đăng nhập vào trang web https://cctools.network.
- Bước 2: Nhấn phím F12 (hoặc chuột phải chọn Kiểm tra), chọn tab Application (Ứng dụng).
- Bước 3: Nhìn menu bên trái, chọn mục Cookies -> https://cctools.network.
- Bước 4: Tìm dòng có tên: "sb-zxazrkpnwlcaeqnquiqx-auth-token" (hoặc có số đuôi .0).
- Bước 5: Copy toàn bộ nội dung ở cột Value (thường bắt đầu bằng chữ "base64-...").
- Bước 6: Dán nội dung đó vào file code.txt. Mỗi tài khoản dán trên 1 dòng riêng biệt.

4. QUY TRÌNH VẬN HÀNH TOOL
- Bước 1 (Lọc dữ liệu): Chạy lệnh: node token.js
  -> Tool sẽ quét file code.txt, giải mã lấy Refresh Token và Access Token rồi lưu vào token.txt.
  -> Chức năng: Tự động chống trùng lặp, giữ lại các token cũ và chỉ thêm mới các token chưa có.
- Bước 2 (Chạy Check-in): Chạy lệnh: node index.js
  -> Tool sẽ bắt đầu quá trình đăng nhập và check-in tự động cho danh sách ví.

5. CÁC TÍNH NĂNG NỔI BẬT CỦA TOOL
- Tự động Refresh Token: Khi Access Token hết hạn sau 1 giờ, tool tự dùng Refresh Token để lấy mã mới, giúp treo tool lâu dài không cần đăng nhập lại.
- Giả lập trình duyệt (Cookie Auth): Gửi dữ liệu dưới dạng Cookie Base64 giống hệt người dùng thật để tránh bị hệ thống chặn API.
- Quản lý Proxy linh hoạt: Mỗi ví chạy 1 Proxy khác nhau. Có thể thay đổi proxy trong file proxy.txt ngay khi tool đang chạy mà không cần khởi động lại.
- Chức năng Resume (Chạy tiếp): Ghi nhớ số thứ tự ví đang chạy. Nếu tool bị ngắt quãng, khi mở lại sẽ chạy tiếp từ ví đó thay vì chạy lại từ đầu.
- Cơ chế Anti-bot:
  + Delay hành động ngẫu nhiên 3-7 giây sau khi login rồi mới check-in.
  + Delay chuyển ví ngẫu nhiên 30-60 giây để tránh bị quét spam.
  + Tự động tạo mã định danh UUID riêng biệt cho mỗi tài khoản.
- Tự động lặp lại (7:00 AM): Sau khi chạy hết danh sách ví, tool sẽ chờ đến đúng 7 giờ sáng giờ Việt Nam để tự động reset và chạy lại lượt mới cho ngày tiếp theo.
- Hệ thống Log: Hiển thị đầy đủ thông tin (Thời gian, Số thứ tự ví, IP, Tên ví, Nội dung XP nhận được) với màu sắc trực quan.

LƯU Ý: Không nhấn nút "Đăng xuất" (Logout) trên trình duyệt sau khi đã lấy Cookie, vì việc đó sẽ vô hiệu hóa Token trên Server. Chỉ cần tắt trình duyệt là đủ.

Tham Gia NHóm tele : https://t.me/HVchannelss

Tham Gia Discor ( Vip ) : https://discord.gg/gKxvTNu5

Tham gia NHóm VIp Với Chi Phí 1 Tháng 4u - 15u 6thang Lợi ích tham gia nhóm ViP Sẽ được cấp keey sử dụng các tool vip trong discor hỗ trợ Và tham khao Code các tool dự án mà các bạn đề xuất

Gửi Phí tháng vào đây và chụp hình gửi trực tiếp cho tôi tại discor để xác nhận Role VIp ☕ https://huynhviet933.github.io/donate_viet_mmo/ Có thể tặng tôi ít cafe tại đây

