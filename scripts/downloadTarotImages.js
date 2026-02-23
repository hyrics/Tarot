// scripts/downloadTarotImages.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

// 获取当前文件的目录路径 (ES模块兼容)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置 - 使用维基百科Commons作为图片源
const BASE_URL = 'https://upload.wikimedia.org/wikipedia/commons';
const IMAGES_DIR = path.join(__dirname, '../public/images/tarot');

// 确保图片目录存在
if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// 大阿卡那牌（0-21）的图片路径映射（基于维基百科Commons）
const MAJOR_ARCANA_IMAGES = {
    0: { filename: "RWS_Tarot_00_Fool.jpg", path: "9/90" },
    1: { filename: "RWS_Tarot_01_Magician.jpg", path: "d/de" },
    2: { filename: "RWS_Tarot_02_High_Priestess.jpg", path: "d/de" },
    3: { filename: "RWS_Tarot_03_Empress.jpg", path: "d/d2" },
    4: { filename: "RWS_Tarot_04_Emperor.jpg", path: "c/c3" },
    5: { filename: "RWS_Tarot_05_Hierophant.jpg", path: "8/8d" },
    6: { filename: "RWS_Tarot_06_Lovers.jpg", path: "3/3a" },
    7: { filename: "RWS_Tarot_07_Chariot.jpg", path: "9/9b" },
    8: { filename: "RWS_Tarot_08_Strength.jpg", path: "f/f5" },
    9: { filename: "RWS_Tarot_09_Hermit.jpg", path: "4/42" },
    10: { filename: "RWS_Tarot_10_Wheel_of_Fortune.jpg", path: "3/3c" },
    11: { filename: "RWS_Tarot_11_Justice.jpg", path: "e/e0" },
    12: { filename: "RWS_Tarot_12_Hanged_Man.jpg", path: "2/2f" },
    13: { filename: "RWS_Tarot_13_Death.jpg", path: "d/d7" },
    14: { filename: "RWS_Tarot_14_Temperance.jpg", path: "f/f8" },
    15: { filename: "RWS_Tarot_15_Devil.jpg", path: "5/55" },
    16: { filename: "RWS_Tarot_16_Tower.jpg", path: "5/53" },
    17: { filename: "RWS_Tarot_17_Star.jpg", path: "d/db" },
    18: { filename: "RWS_Tarot_18_Moon.jpg", path: "7/7f" },
    19: { filename: "RWS_Tarot_19_Sun.jpg", path: "1/17" },
    20: { filename: "RWS_Tarot_20_Judgement.jpg", path: "d/dd" },
    21: { filename: "RWS_Tarot_21_World.jpg", path: "f/f0" }
};

// 小阿卡那牌（22-77）的图片路径映射
// 注意：小阿卡那牌在维基百科Commons上可能使用不同的命名格式
// 这里使用RWS_Tarot_XX格式，如果不存在可能需要调整
const MINOR_ARCANA_IMAGES = {
    // 圣杯牌组 (Cups) - 22-35
    22: { filename: "RWS_Tarot_AC.jpg", path: "2/22" },
    23: { filename: "RWS_Tarot_02C.jpg", path: "f/ff" },
    24: { filename: "RWS_Tarot_03C.jpg", path: "7/7b" },
    25: { filename: "RWS_Tarot_04C.jpg", path: "d/d7" },
    26: { filename: "RWS_Tarot_05C.jpg", path: "0/08" },
    27: { filename: "RWS_Tarot_06C.jpg", path: "d/dd" },
    28: { filename: "RWS_Tarot_07C.jpg", path: "3/38" },
    29: { filename: "RWS_Tarot_08C.jpg", path: "4/46" },
    30: { filename: "RWS_Tarot_09C.jpg", path: "2/27" },
    31: { filename: "RWS_Tarot_10C.jpg", path: "3/3d" },
    32: { filename: "RWS_Tarot_PC.jpg", path: "c/c1" },
    33: { filename: "RWS_Tarot_KC.jpg", path: "d/d5" },
    34: { filename: "RWS_Tarot_QC.jpg", path: "f/f8" },
    35: { filename: "RWS_Tarot_RC.jpg", path: "f/f4" },
    // 权杖牌组 (Wands) - 36-49
    36: { filename: "RWS_Tarot_AW.jpg", path: "f/f8" },
    37: { filename: "RWS_Tarot_02W.jpg", path: "2/2b" },
    38: { filename: "RWS_Tarot_03W.jpg", path: "8/85" },
    39: { filename: "RWS_Tarot_04W.jpg", path: "b/b9" },
    40: { filename: "RWS_Tarot_05W.jpg", path: "6/65" },
    41: { filename: "RWS_Tarot_06W.jpg", path: "d/d8" },
    42: { filename: "RWS_Tarot_07W.jpg", path: "9/9e" },
    43: { filename: "RWS_Tarot_08W.jpg", path: "f/f4" },
    44: { filename: "RWS_Tarot_09W.jpg", path: "8/8e" },
    45: { filename: "RWS_Tarot_10W.jpg", path: "0/04" },
    46: { filename: "RWS_Tarot_PW.jpg", path: "3/36" },
    47: { filename: "RWS_Tarot_KW.jpg", path: "d/db" },
    48: { filename: "RWS_Tarot_QW.jpg", path: "a/a0" },
    49: { filename: "RWS_Tarot_RW.jpg", path: "f/f7" },
    // 宝剑牌组 (Swords) - 50-63
    50: { filename: "RWS_Tarot_AS.jpg", path: "1/1a" },
    51: { filename: "RWS_Tarot_02S.jpg", path: "c/c8" },
    52: { filename: "RWS_Tarot_03S.jpg", path: "7/71" },
    53: { filename: "RWS_Tarot_04S.jpg", path: "2/2d" },
    54: { filename: "RWS_Tarot_05S.jpg", path: "d/d3" },
    55: { filename: "RWS_Tarot_06S.jpg", path: "f/f1" },
    56: { filename: "RWS_Tarot_07S.jpg", path: "9/96" },
    57: { filename: "RWS_Tarot_08S.jpg", path: "4/48" },
    58: { filename: "RWS_Tarot_09S.jpg", path: "c/c4" },
    59: { filename: "RWS_Tarot_10S.jpg", path: "2/2a" },
    60: { filename: "RWS_Tarot_PS.jpg", path: "e/e3" },
    61: { filename: "RWS_Tarot_KS.jpg", path: "1/16" },
    62: { filename: "RWS_Tarot_QS.jpg", path: "c/cb" },
    63: { filename: "RWS_Tarot_RS.jpg", path: "5/5a" },
    // 星币牌组 (Pentacles) - 64-77
    64: { filename: "RWS_Tarot_AP.jpg", path: "8/8d" },
    65: { filename: "RWS_Tarot_02P.jpg", path: "f/f7" },
    66: { filename: "RWS_Tarot_03P.jpg", path: "7/72" },
    67: { filename: "RWS_Tarot_04P.jpg", path: "0/0d" },
    68: { filename: "RWS_Tarot_05P.jpg", path: "e/ea" },
    69: { filename: "RWS_Tarot_06P.jpg", path: "d/d7" },
    70: { filename: "RWS_Tarot_07P.jpg", path: "0/00" },
    71: { filename: "RWS_Tarot_08P.jpg", path: "f/f0" },
    72: { filename: "RWS_Tarot_09P.jpg", path: "4/42" },
    73: { filename: "RWS_Tarot_10P.jpg", path: "3/3e" },
    74: { filename: "RWS_Tarot_PP.jpg", path: "8/83" },
    75: { filename: "RWS_Tarot_KP.jpg", path: "d/d2" },
    76: { filename: "RWS_Tarot_QP.jpg", path: "8/8b" },
    77: { filename: "RWS_Tarot_RP.jpg", path: "d/d5" }
};

// 辅助函数：下载图片（带重试机制）
function downloadImage(url, filepath, retries = 3) {
    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        };

        const attemptDownload = (attempt) => {
            https.get(url, options, (response) => {
                if (response.statusCode === 200) {
                    const fileStream = fs.createWriteStream(filepath);
                    response.pipe(fileStream);
                    fileStream.on('finish', () => {
                        fileStream.close();
                        console.log(`✅ 下载成功: ${path.basename(filepath)}`);
                        resolve();
                    });
                    fileStream.on('error', (err) => {
                        fs.unlink(filepath, () => {}); // 删除不完整的文件
                        if (attempt < retries) {
                            console.log(`⚠️ 文件写入失败，重试中... (${attempt + 1}/${retries})`);
                            setTimeout(() => attemptDownload(attempt + 1), 1000 * attempt);
                        } else {
                            reject(err);
                        }
                    });
                } else if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307 || response.statusCode === 308) {
                    // 处理重定向 - 需要跟随重定向URL
                    const redirectUrl = response.headers.location;
                    if (redirectUrl) {
                        console.log(`🔄 重定向到: ${redirectUrl}`);
                        // 关闭当前响应
                        response.destroy();
                        // 使用新的URL重新下载
                        const newUrl = redirectUrl.startsWith('http') ? redirectUrl : new URL(redirectUrl, url).href;
                        setTimeout(() => {
                            https.get(newUrl, options, (redirectResponse) => {
                                if (redirectResponse.statusCode === 200) {
                                    const fileStream = fs.createWriteStream(filepath);
                                    redirectResponse.pipe(fileStream);
                                    fileStream.on('finish', () => {
                                        fileStream.close();
                                        console.log(`✅ 下载成功（通过重定向）: ${path.basename(filepath)}`);
                                        resolve();
                                    });
                                } else {
                                    reject(new Error(`重定向后失败: HTTP ${redirectResponse.statusCode}`));
                                }
                            }).on('error', reject);
                        }, 500);
                    } else {
                        reject(new Error(`HTTP ${response.statusCode}`));
                    }
                } else {
                    if (response.statusCode === 404) {
                        console.log(`⚠️ 图片不存在 (404): ${path.basename(filepath)}`);
                    } else {
                        console.log(`❌ 下载失败 ${path.basename(filepath)}: HTTP ${response.statusCode}`);
                    }
                    reject(new Error(`HTTP ${response.statusCode}`));
                }
            }).on('error', (err) => {
                if (attempt < retries) {
                    console.log(`⚠️ 网络错误，${1000 * attempt}ms后重试... (${attempt + 1}/${retries}): ${path.basename(filepath)}`);
                    setTimeout(() => attemptDownload(attempt + 1), 1000 * attempt);
                } else {
                    console.log(`❌ 请求失败（已重试${retries}次）: ${path.basename(filepath)} - ${err.message}`);
                    reject(err);
                }
            });
        };

        attemptDownload(1);
    });
}

// 主函数：下载所有图片
async function downloadAllTarotImages() {
    console.log('开始下载塔罗牌图片...\n');
    console.log(`图片保存目录: ${IMAGES_DIR}\n`);

    let successCount = 0;
    let failCount = 0;

    // 1. 下载大阿卡纳 (0-21)
    console.log('--- 下载大阿卡纳 (0-21) ---');
    for (let i = 0; i <= 21; i++) {
        const imageInfo = MAJOR_ARCANA_IMAGES[i];
        if (!imageInfo) {
            console.log(`⚠️ 跳过: 大阿卡纳 ${i} 没有配置`);
            failCount++;
            continue;
        }
        
        const url = `${BASE_URL}/${imageInfo.path}/${imageInfo.filename}`;
        const filepath = path.join(IMAGES_DIR, imageInfo.filename);

        try {
            await downloadImage(url, filepath);
            successCount++;
            // 添加延迟避免请求过快（增加到500ms）
            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
            failCount++;
            // 即使失败也等待一下，避免请求过快
            await new Promise(resolve => setTimeout(resolve, 300));
        }
    }

    // 2. 下载小阿卡纳 (22-77)
    console.log('\n--- 下载小阿卡纳 (22-77) ---');
    for (let i = 22; i <= 77; i++) {
        const imageInfo = MINOR_ARCANA_IMAGES[i];
        if (!imageInfo) {
            console.log(`⚠️ 跳过: 小阿卡纳 ${i} 没有配置`);
            failCount++;
            continue;
        }
        
        const url = `${BASE_URL}/${imageInfo.path}/${imageInfo.filename}`;
        const filepath = path.join(IMAGES_DIR, imageInfo.filename);

        try {
            await downloadImage(url, filepath);
            successCount++;
            // 添加延迟避免请求过快（增加到500ms）
            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
            failCount++;
            // 即使失败也等待一下，避免请求过快
            await new Promise(resolve => setTimeout(resolve, 300));
        }
    }

    console.log(`\n🎉 下载完成！成功: ${successCount}, 失败: ${failCount}`);
    console.log(`\n图片已保存到: ${IMAGES_DIR}`);
    console.log('现在可以在项目中使用本地图片了！');
}

// 执行下载
downloadAllTarotImages().catch(console.error);
