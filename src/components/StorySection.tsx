import type { Chapter } from '../data/photoMetadata';
import type { SitePhoto } from '../data/photos';
import { useReveal } from '../hooks/useReveal';
import { PhotoCard } from './PhotoCard';
import { PhotoGallery } from './PhotoGallery';

interface StorySectionProps {
  chapter: Chapter;
  photos: SitePhoto[];
  onOpen: (globalIndex: number) => void;
}

/**
 * 故事章节：章节题注 + 该章封面大图 + 错落画廊。
 * 章节组织基于照片的真实内容与视觉风格，而非文件名顺序。
 */
export function StorySection({ chapter, photos, onOpen }: StorySectionProps) {
  const { ref, visible } = useReveal<HTMLElement>();
  const cover = photos.find((p) => p.meta.isCover) ?? photos[0];
  const rest = photos.filter((p) => p.id !== cover.id);

  return (
    <section
      ref={ref}
      aria-labelledby={`chapter-${chapter.id}`}
      className={`reveal mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24 ${visible ? 'is-visible' : ''}`}
    >
      <header className="mx-auto mb-12 max-w-xl text-center sm:mb-16">
        <p className="text-[11px] tracking-[0.45em] text-champagne-dark uppercase">{chapter.subtitle}</p>
        <h2 id={`chapter-${chapter.id}`} className="font-display mt-4 text-3xl font-medium text-ink sm:text-4xl">
          {chapter.title}
        </h2>
        <div className="mx-auto mt-5 h-px w-12 bg-champagne" aria-hidden="true" />
        <p className="mt-5 text-sm leading-loose text-ink-soft">{chapter.description}</p>
      </header>

      <div className="mx-auto mb-10 max-w-3xl sm:mb-14">
        <PhotoCard photo={cover} size="display" onClick={() => onOpen(cover.displayIndex - 1)} />
      </div>

      <PhotoGallery photos={rest} onOpen={onOpen} />
    </section>
  );
}
