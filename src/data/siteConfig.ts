/**
 * 站点集中配置：名字、日期、文案均在此处修改。
 * 新人姓名取自用户提供的对象存储目录名「大理 赵雪-郭创奇 定稿OK」，
 * 婚礼日期暂未提供，请替换为真实日期。
 */
export const siteConfig = {
  brideName: '赵雪',
  groomName: '郭创奇',
  weddingDate: '日期待定', // TODO: 替换为真实婚礼日期，例如 '2026.05.20'
  location: '大理',
  heroTitle: '从相遇，到余生',
  heroSubtitle: '山水有相逢，余生皆是你。',
  heroButtonText: '翻开我们的故事',
  blessing: {
    greeting: '亲爱的姐姐和姐夫：',
    body: [
      '愿你们在未来的日子里，既有一起奔赴远方的勇气，也有在平凡生活中相互陪伴的温柔。',
      '愿开心有人分享，困难有人分担，往后岁岁年年，始终相爱。',
    ],
    closing: '新婚快乐，永远幸福。',
  },
  footerQuote: '故事还在继续，幸福没有终点。',
  footerButtonText: '再读一遍这个故事',
} as const;

export type SiteConfig = typeof siteConfig;
