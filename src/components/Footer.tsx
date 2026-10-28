import { siteConfig } from '../data/siteConfig';
import { closingPhoto } from '../data/photos';

/** 结尾：温暖照片收尾 + 名字与日期 + 重读入口 */
export function Footer() {
  const src = closingPhoto.urls?.display ?? null;

  return (
    <footer className="relative flex min-h-[80svh] flex-col items-center justify-center overflow-hidden text-center">
      {src ? (
        <img
          src={src}
          alt={closingPhoto.meta.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-blush/30 to-beige" aria-hidden="true" />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-ink/20 to-ink/55" aria-hidden="true" />

      <div className="relative z-10 px-6">
        <p className="font-display text-3xl leading-relaxed font-medium text-white drop-shadow-sm sm:text-4xl">
          {siteConfig.footerQuote}
        </p>
        <p className="mt-8 text-sm tracking-[0.35em] text-white/85">
          {siteConfig.brideName} &amp; {siteConfig.groomName} · {siteConfig.weddingDate}
        </p>
        <a
          href="#top"
          className="mt-10 inline-block rounded-full border border-white/50 bg-white/10 px-8 py-3 text-sm tracking-[0.25em] text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-white"
        >
          {siteConfig.footerButtonText}
        </a>
      </div>
    </footer>
  );
}
