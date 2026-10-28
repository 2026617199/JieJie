import { useCallback, useState } from 'react';
import { Hero } from './components/Hero';
import { StorySection } from './components/StorySection';
import { PhotoLightbox } from './components/PhotoLightbox';
import { BlessingLetter } from './components/BlessingLetter';
import { Footer } from './components/Footer';
import { sitePhotos, photosByChapter } from './data/photos';

export default function App() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  return (
    <div id="top">
      <Hero />

      <main id="story">
        {/* 引言 */}
        <section className="mx-auto max-w-xl px-6 pt-20 pb-4 text-center sm:pt-28">
          <p className="text-[11px] tracking-[0.45em] text-champagne-dark uppercase">Our Story</p>
          <h2 className="font-display mt-4 text-3xl font-medium text-ink sm:text-4xl">四十六个瞬间</h2>
          <div className="mx-auto mt-5 h-px w-12 bg-champagne" aria-hidden="true" />
          <p className="mt-5 text-sm leading-loose text-ink-soft">
            从湖畔的风，到拱廊的花瓣；从两个人的对视，到一家人的合影。
            这些被快门留住的瞬间，是他们故事里最温柔的注脚。
          </p>
        </section>

        {photosByChapter.map(({ chapter, photos }) => (
          <StorySection key={chapter.id} chapter={chapter} photos={photos} onOpen={openLightbox} />
        ))}
      </main>

      <BlessingLetter />
      <Footer />

      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={sitePhotos}
          index={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}
