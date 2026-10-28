import { useEffect, useRef } from 'react';
import type { SitePhoto } from '../data/photos';

interface PhotoLightboxProps {
  photos: SitePhoto[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/**
 * 大图预览灯箱：
 * - ← / → 切换，Esc 关闭；
 * - 移动端左右滑动切换；
 * - 显示「序号 / 总数」与照片标题、文案；
 * - 加载失败时显示占位提示，不回退本地图片。
 */
export function PhotoLightbox({ photos, index, onClose, onNavigate }: PhotoLightboxProps) {
  const photo = photos[index];
  const total = photos.length;
  const touchStartX = useRef<number | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((index - 1 + total) % total);
      if (e.key === 'ArrowRight') onNavigate((index + 1) % total);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [index, total, onClose, onNavigate]);

  const src = photo.urls?.lightbox ?? photo.urls?.original ?? null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`照片预览：${photo.meta.title}，第 ${photo.displayIndex} 张，共 ${total} 张`}
      tabIndex={-1}
      className="lightbox-enter fixed inset-0 z-50 flex flex-col bg-ink/95 outline-none backdrop-blur-sm"
      onClick={onClose}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > 48) {
          onNavigate(dx > 0 ? (index - 1 + total) % total : (index + 1) % total);
        }
        touchStartX.current = null;
      }}
    >
      {/* 顶栏 */}
      <div className="flex items-center justify-between px-5 py-4 text-cream/90">
        <p className="text-sm tracking-[0.3em] tabular-nums">
          {photo.displayIndex} / {total}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="关闭预览"
          className="rounded-full p-2 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-cream"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* 图片区 */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-12 sm:px-20">
        {src ? (
          <img
            key={photo.id}
            src={src}
            alt={photo.meta.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full rounded-sm object-contain shadow-2xl"
          />
        ) : (
          <div
            className="flex flex-col items-center gap-3 text-cream/70"
            onClick={(e) => e.stopPropagation()}
            role="img"
            aria-label={photo.meta.alt}
          >
            <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <circle cx="9" cy="10" r="1.6" />
              <path d="M4 18l5-5 3 3 4-4 4 4" />
            </svg>
            <p className="text-sm tracking-widest">这张照片的在线链接待配置</p>
            <p className="text-xs text-cream/40">{photo.filename}</p>
          </div>
        )}

        {/* 左右切换 */}
        <button
          type="button"
          aria-label="上一张"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate((index - 1 + total) % total);
          }}
          className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-cream transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-cream sm:left-6"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="下一张"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate((index + 1) % total);
          }}
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-cream transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-cream sm:right-6"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* 底部文案 */}
      <div className="px-6 pt-4 pb-8 text-center" onClick={(e) => e.stopPropagation()}>
        <p className="font-display text-lg text-cream">{photo.meta.title}</p>
        <p className="mt-1 text-sm text-cream/70">{photo.meta.caption}</p>
      </div>
    </div>
  );
}
