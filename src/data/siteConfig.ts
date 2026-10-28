/**
 * 站点集中配置：名字、日期、文案均在此处修改。
 * 新人姓名取自用户提供的对象存储目录名「大理 赵雪-郭创奇 定稿OK」，
 * 婚礼日期：2026年11月2日（农历九月廿四）。
 */
export const siteConfig = {
  brideName: '赵雪',
  groomName: '郭创奇',
  weddingDate: '2026.11.02 · 农历九月廿四',
  location: '大理',
  heroTitle: '从相遇，到余生',
  heroSubtitle: '山水有相逢，余生皆是你。',
  heroButtonText: '翻开我们的故事',
  blessing: {
    intro: '最后我们想说',
    lines: [
      '花开时赏花',
      '不要总想着花落',
      '花落还会结果',
      '不要如此悲观地“未雨绸缪”',
      '尽情享受当下的幸福',
      '自己拥有感知幸福的能力就已足够',
      '况且，在这个世界上',
      '单身是一种幸福',
      '恋爱是一种幸福',
      '结婚也是一种幸福',
      '祝有爱者更有爱，独立者更自由',
    ],
    signature: 'See you at the wedding',
  },
  footerQuote: '故事还在继续，幸福没有终点。',
  footerButtonText: '再读一遍这个故事',
} as const;

export type SiteConfig = typeof siteConfig;
