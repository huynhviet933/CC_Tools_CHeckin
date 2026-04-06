const fs = require('fs-extra');
const colors = require('colors');

function extractTokens() {
    const inputFile = 'code.txt';
    const outputFile = 'token.txt';

    if (!fs.existsSync(inputFile)) {
        console.log(`[!] Lỗi: Không tìm thấy file ${inputFile}`.red);
        return;
    }

    // --- BƯỚC 1: Đọc các token cũ đã có để tránh trùng lặp ---
    let existingTokens = [];
    if (fs.existsSync(outputFile)) {
        existingTokens = fs.readFileSync(outputFile, 'utf-8').split(/\r?\n/).filter(line => line.trim() !== '');
    }
    
    // Tạo một tập hợp các Refresh Token đã tồn tại để so sánh
    const existingRefreshTokens = new Set(existingTokens.map(t => t.split('|')[0]));

    const lines = fs.readFileSync(inputFile, 'utf-8').split(/\r?\n/).filter(line => line.trim() !== '');
    let newResults = [];
    let duplicateCount = 0;

    console.log(`[*] Đang xử lý ${lines.length} dòng dữ liệu mới...`.yellow);

    lines.forEach((line, index) => {
        try {
            let fullBase64 = "";
            const match0 = line.match(/sb-[a-z]+-auth-token\.0=base64-([^;]+)/);
            const match1 = line.match(/sb-[a-z]+-auth-token\.1=([^;]+)/);
            const matchSingle = line.match(/sb-[a-z]+-auth-token=base64-([^;]+)/);

            if (match0) {
                fullBase64 = match0[1] + (match1 ? match1[1] : "");
            } else if (matchSingle) {
                fullBase64 = matchSingle[1];
            }

            if (fullBase64) {
                const decodedString = Buffer.from(fullBase64, 'base64').toString('utf-8');
                const jsonData = JSON.parse(decodedString);
                const accessToken = jsonData.access_token;
                const refreshToken = jsonData.refresh_token;
                const email = jsonData.user ? jsonData.user.email : "Unknown";

                if (accessToken && refreshToken) {
                    // Kiểm tra xem refresh token này đã có trong file chưa
                    if (!existingRefreshTokens.has(refreshToken)) {
                        newResults.push(`${refreshToken}|${accessToken}`);
                        existingRefreshTokens.add(refreshToken); // Đánh dấu đã thêm
                        console.log(`[+] [Dòng ${index+1}] Lọc thành công: ${email}`.green);
                    } else {
                        duplicateCount++;
                        console.log(`[-] [Dòng ${index+1}] Bỏ qua (Đã tồn tại): ${email}`.gray);
                    }
                }
            }
        } catch (err) {
            console.log(`[!] [Dòng ${index+1}] Lỗi giải mã dữ liệu.`.red);
        }
    });

    // --- BƯỚC 2: Ghi nối tiếp vào file ---
    if (newResults.length > 0) {
        // Kết hợp cũ và mới
        const finalData = [...existingTokens, ...newResults].join('\n');
        fs.writeFileSync(outputFile, finalData);
        
        console.log(`\n==========================================`.cyan);
        console.log(`[SUCCESS] Hoàn thành!`.green);
        console.log(`[>] Thêm mới: ${newResults.length} tài khoản`.white);
        console.log(`[>] Bị trùng: ${duplicateCount} tài khoản`.white);
        console.log(`[>] Tổng cộng trong file: ${existingTokens.length + newResults.length}`.yellow);
        console.log(`==========================================`.cyan);
    } else {
        console.log(`\n[!] Không có tài khoản mới nào được thêm vào. (Trùng hoặc lỗi)`.red);
    }
    
    // Sau khi lọc xong, có thể xóa trắng file code.txt để lần sau dán cái mới
    // fs.writeFileSync(inputFile, ''); 
}

extractTokens();