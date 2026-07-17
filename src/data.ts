import type { Member, SkillEntry } from './types';

const skill = (
  name: string,
  category: string,
  level: SkillEntry['level'],
  intent: SkillEntry['intent'],
  comment: string,
  visibility: SkillEntry['visibility'] = 'team',
): SkillEntry => ({ name, category, level, intent, comment, visibility });

export const seedMembers: Member[] = [
  {
    id: 'm1', name: '山田 花子', email: 'hanako@example.com', initials: '山',
    roleLabel: 'シニアデザイナー', role: 'member', capacity: '少し余裕あり',
    updatedAt: '2026-07-12', accent: '#6376C4', active: true,
    direction: '企画と表現をつなぐサービスデザインを伸ばしたい', feedback: [],
    skills: [
      skill('情報設計', 'コミュニケーション', 4, '活かしたい', '複雑な情報を、相手に合わせて整理する仕事を続けたいです。'),
      skill('営業資料', 'コミュニケーション', 4, '今は減らしたい', '経験は活かせますが、次は企画段階から関わる機会を増やしたいです。', 'assigner'),
      skill('サービスデザイン', 'プロダクト', 2, '挑戦したい', '新規サービスの企画から一緒に考えてみたいです。'),
    ],
  },
  {
    id: 'm2', name: '田中 花子', email: 'tanaka@example.com', initials: '田',
    roleLabel: 'デザイナー', role: 'member', capacity: '少し余裕あり',
    updatedAt: '2026-07-15', accent: '#D47861', active: true,
    direction: '情報を整理し、提案の説得力を高められるようになりたい', feedback: [],
    skills: [
      skill('営業資料', 'コミュニケーション', 3, '活かしたい', '重要な提案資料を、構成から担当してみたいです。'),
      skill('情報設計', 'コミュニケーション', 3, '活かしたい', '相手に伝わる順序を考えることが得意です。'),
      skill('ブランドデザイン', 'ブランド・制作', 1, '挑戦したい', '提案資料の経験をブランドづくりへ広げたいです。'),
    ],
  },
  {
    id: 'm3', name: '佐藤 健', email: 'sato@example.com', initials: '佐',
    roleLabel: 'デザインリーダー', role: 'assigner', capacity: 'ほぼ埋まっている',
    updatedAt: '2026-07-10', accent: '#3C8A70', active: true,
    direction: 'チームが継続的に改善できる仕組みをつくりたい', feedback: [],
    skills: [
      skill('UIデザイン', 'プロダクト', 4, '機会があれば', '難しい画面のレビューや整理で力を活かせます。'),
      skill('デザインシステム', 'プロダクト', 5, '活かしたい', '運用まで含めた仕組みづくりを進めたいです。'),
      skill('緊急制作', 'ブランド・制作', 3, '今は避けたい', '今月はプロダクト案件が集中しています。', 'assigner'),
    ],
  },
  {
    id: 'm4', name: '高橋 葵', email: 'aoi@example.com', initials: '高',
    roleLabel: 'UIデザイナー', role: 'member', capacity: '余裕あり',
    updatedAt: '2026-07-16', accent: '#8B69AF', active: true,
    direction: 'プロダクトの体験全体を設計できるようになりたい', feedback: [],
    skills: [
      skill('UIデザイン', 'プロダクト', 3, '活かしたい', '要件整理からエンジニアと一緒に取り組みたいです。'),
      skill('プロトタイピング', 'プロダクト', 3, '活かしたい', '早い段階で触れる形にして対話を進めることが得意です。'),
      skill('UXリサーチ', 'プロダクト', 1, '支援があれば', 'インタビュー設計のレビューがあれば挑戦したいです。'),
    ],
  },
  {
    id: 'm5', name: '伊藤 直樹', email: 'ito@example.com', initials: '伊',
    roleLabel: 'デザイナー', role: 'member', capacity: '新しい仕事は難しい',
    updatedAt: '2026-06-21', accent: '#B4823F', active: true,
    direction: '単発制作の経験を、一貫したブランドづくりへ広げたい', feedback: [],
    skills: [
      skill('グラフィックデザイン', 'ブランド・制作', 4, '機会があれば', '品質を支えるレビューでも力を活かせます。'),
      skill('展示会制作', 'ブランド・制作', 4, '今は減らしたい', '同種の制作が続いたため、しばらく量を減らしたいです。', 'assigner'),
      skill('ブランドデザイン', 'ブランド・制作', 2, '挑戦したい', '複数の接点を通したブランドづくりを経験したいです。'),
    ],
  },
  {
    id: 'm6', name: '小林 美咲', email: 'kobayashi@example.com', initials: '小',
    roleLabel: 'デザイナー', role: 'member', capacity: '少し余裕あり',
    updatedAt: '2026-07-08', accent: '#40859A', active: true,
    direction: '人の声から、伝わるブランド体験をつくりたい', feedback: [],
    skills: [
      skill('Webデザイン', 'ブランド・制作', 4, '活かしたい', '情報設計からビジュアルまで一貫して担当できます。'),
      skill('インタビュー', 'コミュニケーション', 3, '活かしたい', '働く人の声を丁寧に聞く仕事を増やしたいです。'),
      skill('言語化', 'コミュニケーション', 3, '機会があれば', 'デザインの意図を短い言葉にまとめられます。'),
    ],
  },
  {
    id: 'm7', name: '中村 陸', email: 'nakamura@example.com', initials: '中',
    roleLabel: 'アシスタントデザイナー', role: 'member', capacity: '余裕あり',
    updatedAt: '2026-07-14', accent: '#557DA9', active: true,
    direction: '制作だけでなく、使われ続ける仕組みを考えたい', feedback: [],
    skills: [
      skill('資料デザイン', 'コミュニケーション', 2, '支援があれば', 'レビューを受けながら、テンプレート設計に挑戦したいです。'),
      skill('UIデザイン', 'プロダクト', 2, '挑戦したい', '実務で画面設計の経験を増やしたいです。'),
      skill('デザインシステム', 'プロダクト', 1, '挑戦したい', 'コンポーネントを整理する仕事に関心があります。'),
    ],
  },
  {
    id: 'm8', name: '鈴木 美咲', email: 'suzuki@example.com', initials: '鈴',
    roleLabel: 'デザイン部長', role: 'admin', capacity: 'ほぼ埋まっている',
    updatedAt: '2026-07-03', accent: '#405476', active: true,
    direction: '一人ひとりが挑戦しやすいチームをつくりたい', feedback: [],
    skills: [
      skill('ブランドデザイン', 'ブランド・制作', 5, '機会があれば', '初期方針の壁打ちやレビューで支援したいです。'),
      skill('レビュー', '進行・仕組み', 5, '活かしたい', '挑戦する人へのレビューに時間を使いたいです。'),
      skill('企画設計', '進行・仕組み', 4, '活かしたい', '事業とデザインをつなぐ初期設計を支援できます。'),
    ],
  },
];
