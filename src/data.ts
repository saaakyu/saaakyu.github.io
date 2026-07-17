import type { Member, ThemeDefinition, ThemeEntry } from './types';

export const themeDefinitions: ThemeDefinition[] = [
  { name: '人前で話す', category: '伝える', description: 'プレゼンや説明の場で、自分の言葉で伝える' },
  { name: '人に教える', category: '伝える', description: '知っていることを、相手に合わせて伝える' },
  { name: '文章で伝える', category: '伝える', description: '意図や情報を、読み手に届く文章にする' },
  { name: '掘り下げる', category: '考える', description: '背景を探り、問いを重ねて本質を考える' },
  { name: '全体を整理する', category: '考える', description: '情報や意見をまとめ、見通しをつくる' },
  { name: 'アイデアを広げる', category: '考える', description: '複数の見方や可能性を考える' },
  { name: 'もくもくとつくる', category: 'つくる', description: '集中する時間を取り、制作や整理を進める' },
  { name: 'まず形にする', category: 'つくる', description: 'ラフや試作品をつくり、対話を始める' },
  { name: '細部を整える', category: 'つくる', description: '細かな違いに気付き、品質を仕上げる' },
  { name: '人と一緒に進める', category: '進める', description: '関係者と認識をそろえながら進める' },
  { name: '段取りを組む', category: '進める', description: '必要な手順や順番を考え、準備する' },
  { name: '判断して前へ進める', category: '進める', description: '選択肢を整理し、次の行動を決める' },
  { name: '効率化する', category: '整える', description: '繰り返しや手間を減らし、進めやすくする' },
  { name: '仕組みにする', category: '整える', description: '誰でも続けられるルールや形にする' },
  { name: '改善を続ける', category: '整える', description: '使われ方を見ながら、小さく直し続ける' },
];

const theme = (
  name: string,
  experience: ThemeEntry['experience'],
  comfort: ThemeEntry['comfort'],
  intent: ThemeEntry['intent'],
  comment: string,
  tags: string[],
  visibility: ThemeEntry['visibility'] = 'team',
): ThemeEntry => ({
  name,
  category: themeDefinitions.find((item) => item.name === name)?.category ?? 'その他',
  experience,
  comfort,
  intent,
  comment,
  tags,
  visibility,
});

export const seedMembers: Member[] = [
  { id: 'm1', name: '山田 花子', email: 'hanako@example.com', initials: '山', roleLabel: 'シニアデザイナー', role: 'member', updatedAt: '2026-07-12', accent: '#6376C4', active: true, direction: '企画と表現をつなぐ仕事を増やしたい', voices: [], themes: [
    theme('全体を整理する', 4, 4, '活かしたい', '複雑な情報を、相手に合わせて整理することは自然にできます。', ['情報設計', '営業資料']),
    theme('人前で話す', 3, 2, '機会があれば', '準備する時間があれば、自分の言葉で説明できます。', ['プレゼンテーション', '顧客説明']),
    theme('掘り下げる', 2, 3, '挑戦したい', '企画の初期から問いを考える経験を増やしたいです。', ['サービスデザイン']),
  ]},
  { id: 'm2', name: '田中 花子', email: 'tanaka@example.com', initials: '田', roleLabel: 'デザイナー', role: 'member', updatedAt: '2026-07-15', accent: '#D47861', active: true, direction: '情報を伝わる形にして、提案を支えたい', voices: [], themes: [
    theme('人前で話す', 2, 2, '挑戦したい', '少し緊張しますが、顧客への説明経験を増やしたいです。', ['営業資料', '社内共有']),
    theme('文章で伝える', 4, 4, '活かしたい', '短い言葉で要点を伝えることが好きです。', ['コピーライティング', '資料構成']),
    theme('もくもくとつくる', 4, 4, '活かしたい', 'まとまった時間があると、集中して品質を上げられます。', ['資料デザイン', 'Webデザイン']),
  ]},
  { id: 'm3', name: '佐藤 健', email: 'sato@example.com', initials: '佐', roleLabel: 'デザインリーダー', role: 'assigner', updatedAt: '2026-07-10', accent: '#3C8A70', active: true, direction: 'チームが継続的に改善できる仕組みをつくりたい', voices: [], themes: [
    theme('人に教える', 5, 4, '活かしたい', '答えを渡すより、一緒に考えるレビューを大切にしています。', ['デザインレビュー', 'オンボーディング']),
    theme('仕組みにする', 5, 4, '活かしたい', '運用まで含めて、続けられる形を考えられます。', ['デザインシステム', 'ガイドライン']),
    theme('人前で話す', 4, 3, '今は減らしたい', '経験はありますが、今はチーム支援に時間を使いたいです。', ['プレゼンテーション']),
  ]},
  { id: 'm4', name: '高橋 葵', email: 'aoi@example.com', initials: '高', roleLabel: 'UIデザイナー', role: 'member', updatedAt: '2026-07-16', accent: '#8B69AF', active: true, direction: 'プロダクトの体験全体を設計できるようになりたい', voices: [], themes: [
    theme('まず形にする', 4, 4, '活かしたい', '早い段階で触れる形にして、対話を始めるのが得意です。', ['Figma', 'プロトタイピング']),
    theme('掘り下げる', 2, 2, '支援があれば挑戦したい', 'インタビュー設計のレビューがあれば挑戦したいです。', ['UXリサーチ', 'インタビュー']),
    theme('細部を整える', 4, 4, '活かしたい', '画面の一貫性や細かな違和感によく気付きます。', ['UIデザイン']),
  ]},
  { id: 'm5', name: '伊藤 直樹', email: 'ito@example.com', initials: '伊', roleLabel: 'デザイナー', role: 'member', updatedAt: '2026-06-21', accent: '#B4823F', active: true, direction: '制作経験を、一貫したブランドづくりへ広げたい', voices: [], themes: [
    theme('細部を整える', 5, 4, '機会があれば', '印刷物やグラフィックの最終品質を整えられます。', ['グラフィック', '展示会']),
    theme('もくもくとつくる', 5, 3, '今は減らしたい', '制作経験はありますが、同種の量産が続かないようにしたいです。', ['Adobe CC', '印刷物']),
    theme('アイデアを広げる', 2, 3, '挑戦したい', 'ブランドの初期段階から案を広げる経験を増やしたいです。', ['ブランドデザイン']),
  ]},
  { id: 'm6', name: '小林 美咲', email: 'kobayashi@example.com', initials: '小', roleLabel: 'デザイナー', role: 'member', updatedAt: '2026-07-08', accent: '#40859A', active: true, direction: '人の声から、伝わるブランド体験をつくりたい', voices: [], themes: [
    theme('掘り下げる', 4, 4, '活かしたい', '話を聞きながら、その人らしい言葉を見つけるのが好きです。', ['インタビュー', 'UXリサーチ']),
    theme('文章で伝える', 3, 4, '活かしたい', '聞いた内容を、読み手に伝わる文章へまとめられます。', ['採用広報', 'Webサイト']),
    theme('人前で話す', 2, 1, '今は避けたい', '大人数への説明には苦手意識があります。', ['社内共有'], 'assigner'),
  ]},
  { id: 'm7', name: '中村 陸', email: 'nakamura@example.com', initials: '中', roleLabel: 'アシスタントデザイナー', role: 'member', updatedAt: '2026-07-14', accent: '#557DA9', active: true, direction: '制作だけでなく、使われ続ける仕組みを考えたい', voices: [], themes: [
    theme('効率化する', 2, 3, '挑戦したい', 'テンプレートを整えて手間を減らす仕事に関心があります。', ['Notion', '資料テンプレート']),
    theme('まず形にする', 2, 3, '支援があれば挑戦したい', 'レビューを受けながら試作品を作りたいです。', ['Figma']),
    theme('人に教える', 1, 2, 'まだ分からない', 'まだ教える経験はありません。', ['社内共有']),
  ]},
  { id: 'm8', name: '鈴木 美咲', email: 'suzuki@example.com', initials: '鈴', roleLabel: 'デザイン部長', role: 'admin', updatedAt: '2026-07-03', accent: '#405476', active: true, direction: '一人ひとりが挑戦しやすいチームをつくりたい', voices: [], themes: [
    theme('判断して前へ進める', 5, 4, '活かしたい', '情報が揃いきらない状況でも、次の一歩を決められます。', ['企画設計', 'マネジメント']),
    theme('人に教える', 5, 4, '活かしたい', '挑戦する人の壁打ちやレビューに時間を使いたいです。', ['レビュー', '1on1']),
    theme('段取りを組む', 4, 4, '機会があれば', '関係者と順番を整理して、進め方を作れます。', ['プロジェクト設計']),
  ]},
];
