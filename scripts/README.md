# 脚本说明

## downloadTarotImages.js

下载所有塔罗牌图片到本地。

### 使用方法

```bash
npm run download-images
```

### 功能

- 从维基百科Commons下载78张Rider-Waite塔罗牌图片
- 保存到 `public/images/tarot/` 目录
- 图片文件名格式：`RWS_Tarot_XX_Name.jpg`
- 自动创建必要的目录结构

### 下载的图片

- **大阿卡那牌** (0-21): 22张
- **小阿卡那牌** (22-77): 56张
  - 圣杯牌组 (Cups): 22-35
  - 权杖牌组 (Wands): 36-49
  - 宝剑牌组 (Swords): 50-63
  - 星币牌组 (Pentacles): 64-77

### 注意事项

- 下载可能需要一些时间（78张图片，每张间隔200ms）
- 如果某些图片下载失败（404），会显示警告信息
- 下载完成后，项目会自动使用本地图片（通过 `/images/tarot/` 路径）
- 图片会保存在 `public/images/tarot/` 目录中，Vite会自动服务这些静态文件

### 图片使用

下载完成后，`tarotImageUtils.ts` 中的 `getCardImageUrl()` 函数会自动返回本地图片路径：
- 本地路径：`/images/tarot/RWS_Tarot_XX_Name.jpg`
- 如果本地图片不存在，浏览器会显示404（可以考虑添加fallback机制）

### 重新下载

如果需要重新下载所有图片，直接再次运行命令即可。脚本会覆盖已存在的文件。
