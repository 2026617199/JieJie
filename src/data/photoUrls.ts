import { buildProcessedUrls } from '../utils/imageUrl';

/**
 * 照片在线地址配置。
 *
 * 状态说明：
 * - 'ready'   ：originalUrl 已由用户提供并经过 HTTP 200 实测验证（2026-10-28）。
 * - 'pending' ：原始在线地址尚未提供，严禁通过替换文件名伪造签名 URL。
 *
 * 注意：现有 URL 带 sign/t 临时签名参数。经核实 t=1793201154 是签发时间
 * （2026-10-28 23:25 +08:00），即云托管生成的临时下载链接，有效期有限，
 * 不能当作永久地址；长期部署需更换为长期有效地址（见最终说明）。
 */

export interface WeddingPhoto {
  id: string;
  filename: string;
  /** 原始在线地址；未提供时为 null */
  originalUrl: string | null;
  status: 'ready' | 'pending';
  /** 关联 photoMetadata 中的记录 */
  metadataId: string;
}

const CLOUD_DIR =
  'https://7072-prod-7gjkstqy98f6c93f-1362504576.tcb.qcloud.la/%E5%A4%A7%E7%90%86%20%20%E8%B5%B5%E9%9B%AA-%E9%83%AD%E5%88%9B%E5%A5%87%20%20%E5%AE%9A%E7%A8%BFOK';

const entries: Array<[filename: string, signedQuery: string | null]> = [
  ['DSC04823.jpg', 'sign=3e4532086e06c67d8f999b56e693c2dd&t=1793201154'],
  ['DSC04838.jpg', 'sign=83482fae275f6a4e8d0bf407aa234bf9&t=1793201184'],
  ['DSC04848.jpg', null],
  ['DSC04884.jpg', null],
  ['DSC04955.jpg', null],
  ['DSC04967.jpg', null],
  ['DSC04983.jpg', null],
  ['DSC04985.jpg', null],
  ['DSC05040.jpg', null],
  ['DSC05126.jpg', null],
  ['DSC05138.jpg', null],
  ['DSC05155.jpg', null],
  ['DSC05168.jpg', null],
  ['DSC05205.jpg', null],
  ['DSC05208.jpg', null],
  ['DSC05214.jpg', null],
  ['DSC05218.jpg', null],
  ['DSC05227.jpg', null],
  ['DSC05234.jpg', null],
  ['DSC05253.jpg', null],
  ['DSC05286.jpg', null],
  ['DSC05318.jpg', null],
  ['DSC05324.jpg', null],
  ['DSC05377.jpg', null],
  ['DSC05385.jpg', null],
  ['DSC05391.jpg', null],
  ['DSC05430.jpg', null],
  ['DSC05468.jpg', null],
  ['DSC05509.jpg', null],
  ['DSC05514.jpg', null],
  ['DSC05529.jpg', null],
  ['DSC05573.jpg', null],
  ['DSC05609.jpg', null],
  ['DSC05627.jpg', null],
  ['DSC05649.jpg', null],
  ['DSC05692.jpg', null],
  ['DSC05700.jpg', null],
  ['DSC05705.jpg', null],
  ['DSC05726.jpg', null],
  ['DSC05742.jpg', null],
  ['DSC05747.jpg', null],
  ['DSC05756.jpg', null],
  ['DSC05811.jpg', null],
  ['DSC05820.jpg', null],
  ['DSC05851.jpg', null],
  ['DSC05914--.jpg', null],
];

export const weddingPhotos: WeddingPhoto[] = entries.map(([filename, query], index) => ({
  id: `photo-${String(index + 1).padStart(2, '0')}`,
  filename,
  originalUrl: query ? `${CLOUD_DIR}/${filename}?${query}` : null,
  status: query ? 'ready' : 'pending',
  metadataId: filename,
}));

/** 由配置派生的、带各尺寸处理地址的视图模型 */
export const photoViews = weddingPhotos.map((p) => ({
  ...p,
  urls: buildProcessedUrls(p.originalUrl),
}));

export const missingUrlPhotos = weddingPhotos.filter((p) => p.status === 'pending');
