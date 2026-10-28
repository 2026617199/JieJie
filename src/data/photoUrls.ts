import { buildProcessedUrls } from '../utils/imageUrl';

/**
 * 照片在线地址配置。
 *
 * 状态说明：
 * - 'ready'   ：originalUrl 已经过 HTTP 200 实测验证。
 * - 'pending' ：原始在线地址尚未提供。
 *
 * 验证记录（2026-10-29）：
 * 用户提供 DSC04823 / DSC04838 两条签名链接后，实测该 CloudBase 目录的
 * 临时签名不绑定具体文件名——同一 sign/t 对目录内全部 46 张照片均返回 200，
 * 且 Content-Length 与本地原图字节数一致，imageMogr2 处理同样生效。
 * 因此 46 张照片统一使用同一组签名参数（沿用 DSC04823 的签名）。
 *
 * 注意：sign/t 仍是临时签名（t=1793201154 为签发时间 2026-10-28 23:25 +08:00），
 * 过期后所有链接会同时失效，长期部署需更换为长期有效地址（公有读直链或
 * 服务端按需签发，见最终说明）。
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

/** 目录级临时签名（实测对该目录内全部 46 个对象有效，见文件头验证记录） */
const SHARED_QUERY = 'sign=3e4532086e06c67d8f999b56e693c2dd&t=1793201154';

const filenames = [
  'DSC04823.jpg',
  'DSC04838.jpg',
  'DSC04848.jpg',
  'DSC04884.jpg',
  'DSC04955.jpg',
  'DSC04967.jpg',
  'DSC04983.jpg',
  'DSC04985.jpg',
  'DSC05040.jpg',
  'DSC05126.jpg',
  'DSC05138.jpg',
  'DSC05155.jpg',
  'DSC05168.jpg',
  'DSC05205.jpg',
  'DSC05208.jpg',
  'DSC05214.jpg',
  'DSC05218.jpg',
  'DSC05227.jpg',
  'DSC05234.jpg',
  'DSC05253.jpg',
  'DSC05286.jpg',
  'DSC05318.jpg',
  'DSC05324.jpg',
  'DSC05377.jpg',
  'DSC05385.jpg',
  'DSC05391.jpg',
  'DSC05430.jpg',
  'DSC05468.jpg',
  'DSC05509.jpg',
  'DSC05514.jpg',
  'DSC05529.jpg',
  'DSC05573.jpg',
  'DSC05609.jpg',
  'DSC05627.jpg',
  'DSC05649.jpg',
  'DSC05692.jpg',
  'DSC05700.jpg',
  'DSC05705.jpg',
  'DSC05726.jpg',
  'DSC05742.jpg',
  'DSC05747.jpg',
  'DSC05756.jpg',
  'DSC05811.jpg',
  'DSC05820.jpg',
  'DSC05851.jpg',
  'DSC05914--.jpg',
];

export const weddingPhotos: WeddingPhoto[] = filenames.map((filename, index) => ({
  id: `photo-${String(index + 1).padStart(2, '0')}`,
  filename,
  originalUrl: `${CLOUD_DIR}/${filename}?${SHARED_QUERY}`,
  status: 'ready',
  metadataId: filename,
}));

/** 由配置派生的、带各尺寸处理地址的视图模型 */
export const photoViews = weddingPhotos.map((p) => ({
  ...p,
  urls: buildProcessedUrls(p.originalUrl),
}));

export const missingUrlPhotos = weddingPhotos.filter((p) => p.status === 'pending');
