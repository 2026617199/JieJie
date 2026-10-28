import { siteConfig } from '../data/siteConfig';
import { useReveal } from '../hooks/useReveal';

/** 祝福信：克制的信纸式排版 */
export function BlessingLetter() {
  const { ref, visible } = useReveal<HTMLElement>();
  const { blessing } = siteConfig;

  return (
    <section
      ref={ref}
      aria-labelledby="blessing-title"
      className={`reveal bg-beige/60 px-5 py-20 sm:py-28 ${visible ? 'is-visible' : ''}`}
    >
      <div className="relative mx-auto max-w-2xl rounded-sm bg-cream px-8 py-12 shadow-[0_2px_24px_rgba(68,60,51,0.08)] ring-1 ring-ink/5 sm:px-14 sm:py-16">
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-champagne/60 to-transparent" aria-hidden="true" />
        <p className="text-center text-[11px] tracking-[0.45em] text-champagne-dark uppercase">A Letter of Blessing</p>
        <h2 id="blessing-title" className="font-display mt-4 text-center text-3xl font-medium text-ink">
          写给你们的祝福
        </h2>
        <div className="mx-auto mt-5 h-px w-12 bg-champagne" aria-hidden="true" />

        <div className="mt-10 space-y-6 text-[15px] leading-loose text-ink">
          <p className="font-display text-lg">{blessing.greeting}</p>
          {blessing.body.map((line) => (
            <p key={line} className="indent-8">
              {line}
            </p>
          ))}
          <p className="indent-8">{blessing.closing}</p>
        </div>

        <p className="font-display mt-12 text-right text-sm text-ink-soft">—— 永远爱你们的家人</p>
      </div>
    </section>
  );
}
