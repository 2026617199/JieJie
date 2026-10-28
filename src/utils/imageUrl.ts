/**
 * 腾讯云数据万象（CI）imageMogr2 实时图片处理工具。
 *
 * 已知 URL 形式：.../DSC04823.jpg?sign=xxx&t=xxx
 * 已实测验证：在现有查询串后追加 &imageMogr2/... 可正常返回处理后的 webp
 * （2026-10-28 验证：DSC04823 缩略图返回 640x427 webp，46KB，原图 11MB）。
 */

export interface ProcessedUrls {
  /** 原始在线地址（未做处理） */
  original: string;
  /** 缩略图：画廊网格使用 */
  thumbnail: string;
  /** 展示图：章节封面 / 主视觉使用 */
  display: string;
  /** 大图预览：灯箱使用（限制最长边，控制流量） */
  lightbox: string;
}

export const THUMB_PROCESS = 'imageMogr2/thumbnail/640x640/format/webp/rquality/80';
export const DISPLAY_PROCESS = 'imageMogr2/thumbnail/1200x1200/format/webp/rquality/85';
export const LIGHTBOX_PROCESS = 'imageMogr2/thumbnail/1920x1920/format/webp/rquality/88';

/**
 * 在原始 URL 上追加 imageMogr2 处理参数。
 * - 已含查询串（sign/t 等签名参数）时使用 & 连接，不会重复添加 ?；
 * - 已含 imageMogr2 时原样返回，避免重复处理。
 */
export function withImageMogr2(originalUrl: string, process: string): string {
  if (originalUrl.includes('imageMogr2/')) return originalUrl;
  const sep = originalUrl.includes('?') ? '&' : '?';
  return `${originalUrl}${sep}${process}`;
}

/** 根据原始地址生成各尺寸处理地址；无原始地址时返回 null。 */
export function buildProcessedUrls(originalUrl: string | null): ProcessedUrls | null {
  if (!originalUrl) return null;
  return {
    original: originalUrl,
    thumbnail: withImageMogr2(originalUrl, THUMB_PROCESS),
    display: withImageMogr2(originalUrl, DISPLAY_PROCESS),
    lightbox: withImageMogr2(originalUrl, LIGHTBOX_PROCESS),
  };
}
