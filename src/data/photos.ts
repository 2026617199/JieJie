import { chapters, metadataByFilename, type PhotoMetadata, type ChapterId } from './photoMetadata';
import { photoViews, type WeddingPhoto } from './photoUrls';
import type { ProcessedUrls } from '../utils/imageUrl';

export interface SitePhoto extends WeddingPhoto {
  meta: PhotoMetadata;
  urls: ProcessedUrls | null;
  /** 横版照片使用 3:2，竖版使用 2:3，用于减少布局偏移 */
  orientation: 'landscape' | 'portrait';
  /** 在整站展示顺序中的序号（从 1 开始） */
  displayIndex: number;
}

/** 依据视觉分析记录为横幅构图的照片 */
const landscapeFilenames = new Set([
  'DSC04823.jpg',
  'DSC04848.jpg',
  'DSC05208.jpg',
  'DSC05385.jpg',
  'DSC05509.jpg',
  'DSC05573.jpg',
  'DSC05609.jpg',
  'DSC05692.jpg',
  'DSC05726.jpg',
  'DSC05742.jpg',
  'DSC05747.jpg',
]);

const chapterOrder = new Map<ChapterId, number>(chapters.map((c) => [c.id, c.order]));

const sorted = [...photoViews].sort((a, b) => {
  const metaA = metadataByFilename.get(a.filename);
  const metaB = metadataByFilename.get(b.filename);
  const chapterDiff =
    (chapterOrder.get(metaA?.chapter ?? 'lake') ?? 0) - (chapterOrder.get(metaB?.chapter ?? 'lake') ?? 0);
  if (chapterDiff !== 0) return chapterDiff;
  return photoViews.indexOf(a) - photoViews.indexOf(b);
});

export const sitePhotos: SitePhoto[] = sorted.map((p, i) => {
  const meta = metadataByFilename.get(p.filename);
  if (!meta) throw new Error(`缺少照片元数据: ${p.filename}`);
  return {
    ...p,
    meta,
    urls: p.urls,
    orientation: landscapeFilenames.has(p.filename) ? 'landscape' : 'portrait',
    displayIndex: i + 1,
  };
});

export const photosByChapter = chapters.map((chapter) => ({
  chapter,
  photos: sitePhotos.filter((p) => p.meta.chapter === chapter.id),
}));

export const heroPhoto = sitePhotos.find((p) => p.filename === 'DSC04823.jpg') ?? sitePhotos[0];
/** 结尾视觉：相拥特写 DSC05747；无 URL 时自动回退到第一张可用照片 */
export const closingPhoto =
  sitePhotos.find((p) => p.filename === 'DSC05747.jpg' && p.urls) ??
  sitePhotos.find((p) => p.urls) ??
  sitePhotos[0];
