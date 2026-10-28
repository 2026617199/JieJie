import { siteConfig } from '../data/siteConfig';
import { useReveal } from '../hooks/useReveal';

/** 结尾寄语：居中的诗行式排版，配手写体落款与新人背影插画 */
export function BlessingLetter() {
  const { ref, visible } = useReveal<HTMLElement>();
  const { blessing } = siteConfig;

  return (
    <section
      ref={ref}
      aria-labelledby="blessing-title"
      className={`reveal bg-cream px-5 py-20 sm:py-28 ${visible ? 'is-visible' : ''}`}
    >
      <div className="mx-auto max-w-xl text-center">
        <h2 id="blessing-title" className="sr-only">
          写给你们的祝福
        </h2>
        <p aria-hidden="true" className="font-display text-xl leading-none text-ink-soft/70">
          /
        </p>

        <div className="font-display mt-10 space-y-5 text-[15px] leading-loose text-ink sm:text-base">
          <p>{blessing.intro}</p>
          {blessing.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <p className="font-script mt-14 -rotate-3 text-4xl leading-snug text-champagne sm:text-5xl">
          {blessing.signature}
        </p>

        <CoupleIllustration />
      </div>
    </section>
  );
}

/** 新人背影线稿：新娘举花、新郎振臂欢呼 */
function CoupleIllustration() {
  return (
    <svg
      viewBox="0 0 360 240"
      className="mx-auto mt-10 w-60 sm:w-72"
      role="img"
      aria-label="新娘高举花束、新郎振臂欢呼的背影插画"
    >
      {/* 新娘 */}
      <g stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="120" cy="60" r="5.5" fill="var(--color-ink)" stroke="none" />
        <circle cx="120" cy="74" r="12" fill="#ffffff" />
        <path d="M 108.5 72 A 12 12 0 0 1 131.5 72 Z" fill="var(--color-ink)" stroke="none" />
        <line x1="120" y1="86" x2="120" y2="94" />
        <path
          d="M 108 97 Q 120 92 132 97 L 127 120 C 140 147 148 172 150 194
             Q 146 202 136 198 Q 126 206 116 198 Q 106 206 96 198 Q 90 202 88 194
             C 92 172 100 147 113 120 Z"
          fill="#ffffff"
        />
        <path d="M 116 152 Q 113 170 112 185" fill="none" strokeWidth="1.2" opacity="0.5" />
        <path d="M 134 150 Q 138 168 140 183" fill="none" strokeWidth="1.2" opacity="0.5" />
        <path d="M 110 99 Q 103 114 101 128" fill="none" strokeWidth="3" />
        <path d="M 130 99 Q 147 78 159 62" fill="none" strokeWidth="3" />
        {/* 花束 */}
        <path d="M 159 62 L 164 52 M 159 62 L 168 53" fill="none" strokeWidth="1.5" />
        <circle cx="164" cy="46" r="4.5" fill="var(--color-ink)" stroke="none" />
        <circle cx="158" cy="50" r="3.2" fill="var(--color-ink)" stroke="none" />
        <circle cx="170" cy="49" r="3.2" fill="var(--color-ink)" stroke="none" />
      </g>

      {/* 新郎（纯色剪影） */}
      <g fill="var(--color-ink)" stroke="var(--color-ink)" strokeLinecap="round">
        <path d="M 213 98 Q 200 78 188 62" fill="none" strokeWidth="9" />
        <path d="M 237 98 Q 250 78 262 62" fill="none" strokeWidth="9" />
        <circle cx="186" cy="58" r="5" stroke="none" />
        <circle cx="264" cy="58" r="5" stroke="none" />
        <circle cx="225" cy="72" r="13" stroke="none" />
        <path d="M 211 94 Q 225 88 239 94 L 237 158 L 213 158 Z" stroke="none" />
        <path d="M 213 152 L 237 152 L 236 198 L 228 198 L 225 168 L 222 198 L 214 198 Z" stroke="none" />
        <ellipse cx="217" cy="202" rx="7" ry="3.5" stroke="none" />
        <ellipse cx="232" cy="202" rx="7" ry="3.5" stroke="none" />
      </g>
    </svg>
  );
}
