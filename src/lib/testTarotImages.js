// 测试塔罗牌图片URL
import { getCardImageUrl } from './tarotImageUtils';

console.log('测试塔罗牌图片URL:');
console.log('愚者 (0):', getCardImageUrl(0, 'The Fool'));
console.log('魔术师 (1):', getCardImageUrl(1, 'The Magician'));
console.log('圣杯一 (22):', getCardImageUrl(22, 'Ace of Cups'));
console.log('权杖骑士 (47):', getCardImageUrl(47, 'Knight of Wands'));
console.log('宝剑皇后 (62):', getCardImageUrl(62, 'Queen of Swords'));
console.log('星币国王 (77):', getCardImageUrl(77, 'King of Pentacles'));

// 测试一些无效的ID
console.log('无效ID (100):', getCardImageUrl(100, 'Unknown Card'));