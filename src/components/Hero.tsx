import { siteConfig } from '../data/siteConfig';
import { heroPhoto } from '../data/photos';

export function Hero() {
  const heroSrc = heroPhoto.urls?.display ?? heroPhoto.urls?.original ?? null;

  return (
    <header className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden">
      {/* 主视觉背景 */}
      {heroSrc ? (
        <img
          src={heroSrc}
          alt={heroPhoto.meta.alt}
          className="kenburns absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-beige via-cream to-blush/40" aria-hidden="true" />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/25 to-cream" aria-hidden="true" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <p className="text-xs tracking-[0.5em] text-white/85 uppercase">
          {siteConfig.location} · Wedding Memories
        </p>

        <h1 className="font-display mt-8 text-4xl leading-snug font-medium text-white drop-shadow-sm sm:text-5xl md:text-6xl">
          {siteConfig.heroTitle}
        </h1>

        <div className="mt-8 flex items-center gap-4 text-white/95">
          <span className="h-px w-10 bg-white/60 sm:w-16" aria-hidden="true" />
          <p className="font-display text-xl sm:text-2xl">
            {siteConfig.brideName}
            <span className="mx-3 text-champagne">&amp;</span>
            {siteConfig.groomName}
          </p>
          <span className="h-px w-10 bg-white/60 sm:w-16" aria-hidden="true" />
        </div>

        <p className="mt-4 text-sm tracking-[0.35em] text-white/80">{siteConfig.weddingDate}</p>

        <p className="mt-10 max-w-md text-sm leading-loose text-white/90 sm:text-base">
          {siteConfig.heroSubtitle}
        </p>

        <a
          href="#story"
          className="mt-12 inline-flex items-center gap-3 rounded-full border border-white/50 bg-white/10 px-8 py-3 text-sm tracking-[0.25em] text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-white"
        >
          {siteConfig.heroButtonText}
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M12 5v14m0 0l-6-6m6 6l6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/60" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="h-6 w-6 animate-bounce" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </header>
  );
}
