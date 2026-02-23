// 测试网络连接和图片URL是否可访问
import https from 'https';

const testUrl = 'https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg';

console.log('测试网络连接...');
console.log(`测试URL: ${testUrl}\n`);

const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
};

https.get(testUrl, options, (response) => {
    console.log(`状态码: ${response.statusCode}`);
    console.log(`响应头:`, response.headers);
    
    if (response.statusCode === 200) {
        console.log('\n✅ 网络连接正常，可以下载图片！');
        let dataLength = 0;
        response.on('data', (chunk) => {
            dataLength += chunk.length;
        });
        response.on('end', () => {
            console.log(`✅ 图片大小: ${(dataLength / 1024).toFixed(2)} KB`);
            console.log('\n可以运行 npm run download-images 下载所有图片');
        });
    } else if (response.statusCode === 301 || response.statusCode === 302) {
        console.log(`\n⚠️ 重定向到: ${response.headers.location}`);
        console.log('脚本会自动处理重定向');
    } else {
        console.log(`\n❌ 无法访问图片，状态码: ${response.statusCode}`);
    }
}).on('error', (err) => {
    console.log(`\n❌ 网络错误: ${err.message}`);
    console.log('\n可能的原因：');
    console.log('1. 网络连接不稳定');
    console.log('2. 防火墙或代理设置问题');
    console.log('3. 维基百科服务器暂时不可用');
    console.log('\n建议：');
    console.log('- 检查网络连接');
    console.log('- 稍后重试');
    console.log('- 或手动下载图片到 public/images/tarot/ 目录');
});
