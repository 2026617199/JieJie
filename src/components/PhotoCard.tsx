import { useState } from 'react';
import type { SitePhoto } from '../data/photos';

interface PhotoCardProps {
  photo: SitePhoto;
  /** thumb: 画廊缩略图；display: 封面/主视觉大图 */
  size?: 'thumb' | 'display';
  onClick?: () => void;
  eager?: boolean;
  showCaption?: boolean;
  className?: string;
}

/**
 * 照片卡片：
 * - 仅使用已验证的在线 URL，绝不回退到本地 picture/ 路径；
 * - 缺少 URL 或加载失败时显示明确的占位提示；
 * - 依据照片方向设置宽高比，减少布局偏移。
 */
export function PhotoCard({ photo, size = 'thumb', onClick, eager = false, showCaption = true, className = '' }: PhotoCardProps) {
  const [failed, setFailed] = useState(false);
  const src = size === 'thumb' ? photo.urls?.thumbnail : photo.urls?.display;
  const aspect = photo.orientation === 'landscape' ? 'aspect-[3/2]' : 'aspect-[2/3]';

  const body =
    !src || failed ? (
      <div
        className={`flex ${aspect} w-full flex-col items-center justify-center gap-2 bg-beige px-4 text-center`}
        role="img"
        aria-label={photo.meta.alt}
      >
        <svg viewBox="0 0 24 24" className="h-8 w-8 text-champagne" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="9" cy="10" r="1.6" />
          <path d="M4 18l5-5 3 3 4-4 4 4" />
        </svg>
        <p className="text-xs tracking-widest text-ink-soft">
          {failed ? '图片加载失败' : '在线链接待配置'}
        </p>
        <p className="font-display text-sm text-ink">{photo.meta.title}</p>
        <p className="text-[10px] text-ink-soft/70">{photo.filename}</p>
      </div>
    ) : (
      <img
        src={src}
        alt={photo.meta.alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setFailed(true)}
        className={`${aspect} w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]`}
      />
    );

  return (
    <figure className={`group ${className}`}>
      <button
        type="button"
        onClick={onClick}
        aria-label={`查看照片：${photo.meta.title}`}
        className="block w-full cursor-pointer overflow-hidden rounded-sm bg-beige shadow-[0_1px_3px_rgba(68,60,51,0.08)] ring-1 ring-ink/5 transition-shadow duration-500 hover:shadow-[0_12px_32px_rgba(68,60,51,0.14)] focus-visible:outline-2 focus-visible:outline-champagne"
      >
        {body}
      </button>
      {showCaption && (
        <figcaption className="mt-3 px-1">
          <p className="font-display text-base text-ink">{photo.meta.title}</p>
          <p className="mt-1 text-xs leading-relaxed text-ink-soft">{photo.meta.caption}</p>
        </figcaption>
      )}
    </figure>
  );
}
