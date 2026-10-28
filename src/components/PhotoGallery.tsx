import type { SitePhoto } from '../data/photos';
import { PhotoCard } from './PhotoCard';

interface PhotoGalleryProps {
  photos: SitePhoto[];
  /** 点击照片时回传其在整站序列中的下标 */
  onOpen: (globalIndex: number) => void;
}

/**
 * 章节画廊：CSS 多列错落排版，保留照片真实比例（横 3:2 / 竖 2:3），
 * 非首屏图片懒加载。
 */
export function PhotoGallery({ photos, onOpen }: PhotoGalleryProps) {
  return (
    <div className="columns-2 gap-4 sm:gap-6 md:columns-3 [&>figure]:mb-4 [&>figure]:break-inside-avoid sm:[&>figure]:mb-6">
      {photos.map((photo) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          size="thumb"
          onClick={() => onOpen(photo.displayIndex - 1)}
        />
      ))}
    </div>
  );
}
