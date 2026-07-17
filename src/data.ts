import type { Member, ThemeDefinition, ThemeEntry } from './types';

export const themeDefinitions: ThemeDefinition[] = [
  ['話す','伝える','考えや情報を、口頭で相手に伝える'],['書く','伝える','考えや情報を、文章で伝える'],['教える','伝える','知っていることを、相手に合わせて伝える'],
  ['聞く','考える','相手の話から、意図や背景を受け取る'],['探る','考える','問いを重ね、背景や原因を深掘りする'],['考える','考える','まだ決まっていないことの案や方向を考える'],['まとめる','考える','複数の情報や意見を整理する'],
  ['つくる','つくる','まだ形になっていないものを見える形にする'],['進める','進める','次の行動を決め、仕事を前へ動かす'],['整える','整える','使いやすく、続けやすい形にする'],
].map(([name,category,description],order)=>({id:`theme-${order+1}`,name,category,description,active:true,order}));

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
  { id: 'm1', name: '山田 花子', email: 'hanako@example.com', initials: '山', roleLabel: 'シニアデザイナー', role: 'member', updatedAt: '2026-07-12', accent: '#6376C4', active: true, direction: '企画と表現をつなぐ仕事を増やしたい', overall: { x: 28, y: 68, comment: '一人で整理してから、早めに周囲へ共有する進め方が合っています。' }, voices: [], themes: [
    theme('まとめる', 4, 4, '活かしたい', '複雑な情報を、相手に合わせて整理することは自然にできます。', ['情報設計', '営業資料']),
    theme('話す', 3, 2, '機会があれば', '準備する時間があれば、自分の言葉で説明できます。', ['プレゼンテーション', '顧客説明']),
    theme('探る', 2, 3, '挑戦したい', '企画の初期から問いを考える経験を増やしたいです。', ['サービスデザイン']),
  ]},
  { id: 'm2', name: '田中 花子', email: 'tanaka@example.com', initials: '田', roleLabel: 'デザイナー', role: 'member', updatedAt: '2026-07-15', accent: '#D47861', active: true, direction: '情報を伝わる形にして、提案を支えたい', overall: { x: 43, y: 36, comment: '集中して形にする時間を大切にしつつ、伝える経験も増やしたいです。' }, voices: [], themes: [
    theme('話す', 2, 2, '挑戦したい', '少し緊張しますが、顧客への説明経験を増やしたいです。', ['営業資料', '社内共有']),
    theme('書く', 4, 4, '活かしたい', '短い言葉で要点を伝えることが好きです。', ['コピーライティング', '資料構成']),
    theme('つくる', 4, 4, '活かしたい', 'まとまった時間があると、集中して品質を上げられます。', ['資料デザイン', 'Webデザイン']),
  ]},
  { id: 'm3', name: '佐藤 健', email: 'sato@example.com', initials: '佐', roleLabel: 'デザインリーダー', role: 'assigner', updatedAt: '2026-07-10', accent: '#3C8A70', active: true, direction: 'チームが継続的に改善できる仕組みをつくりたい', overall: { x: 70, y: 42, comment: '人と認識をそろえながら、続けられる形へ整えることが多いです。' }, voices: [], themes: [
    theme('教える', 5, 4, '活かしたい', '答えを渡すより、一緒に考えるレビューを大切にしています。', ['デザインレビュー', 'オンボーディング']),
    theme('整える', 5, 4, '活かしたい', '運用まで含めて、続けられる形を考えられます。', ['デザインシステム', 'ガイドライン']),
    theme('話す', 4, 3, '今は減らしたい', '経験はありますが、今はチーム支援に時間を使いたいです。', ['プレゼンテーション']),
  ]},
  { id: 'm4', name: '高橋 葵', email: 'aoi@example.com', initials: '高', roleLabel: 'UIデザイナー', role: 'member', updatedAt: '2026-07-16', accent: '#8B69AF', active: true, direction: 'プロダクトの体験全体を設計できるようになりたい', overall: { x: 38, y: 78, comment: 'まず試作品をつくり、触りながら考えると力を出しやすいです。' }, voices: [], themes: [
    theme('つくる', 4, 4, '活かしたい', '早い段階で触れる形にして、対話を始めるのが得意です。', ['Figma', 'プロトタイピング']),
    theme('探る', 2, 2, '支援があれば挑戦したい', 'インタビュー設計のレビューがあれば挑戦したいです。', ['UXリサーチ', 'インタビュー']),
    theme('整える', 4, 4, '活かしたい', '画面の一貫性や細かな違和感によく気付きます。', ['UIデザイン']),
  ]},
  { id: 'm5', name: '伊藤 直樹', email: 'ito@example.com', initials: '伊', roleLabel: 'デザイナー', role: 'member', updatedAt: '2026-06-21', accent: '#B4823F', active: true, direction: '制作経験を、一貫したブランドづくりへ広げたい', overall: { x: 22, y: 30, comment: 'じっくり手を動かし、細部まで整える時間を大切にしています。' }, voices: [], themes: [
    theme('整える', 5, 4, '機会があれば', '印刷物やグラフィックの最終品質を整えられます。', ['グラフィック', '展示会']),
    theme('つくる', 5, 3, '今は減らしたい', '制作経験はありますが、同種の量産が続かないようにしたいです。', ['Adobe CC', '印刷物']),
    theme('考える', 2, 3, '挑戦したい', 'ブランドの初期段階から案を広げる経験を増やしたいです。', ['ブランドデザイン']),
  ]},
  { id: 'm6', name: '小林 美咲', email: 'kobayashi@example.com', initials: '小', roleLabel: 'デザイナー', role: 'member', updatedAt: '2026-07-08', accent: '#40859A', active: true, direction: '人の声から、伝わるブランド体験をつくりたい', overall: { x: 58, y: 66, comment: '人の話を聞いて深掘りし、言葉や形にして返すことが好きです。' }, voices: [], themes: [
    theme('探る', 4, 4, '活かしたい', '話を聞きながら、その人らしい言葉を見つけるのが好きです。', ['インタビュー', 'UXリサーチ']),
    theme('書く', 3, 4, '活かしたい', '聞いた内容を、読み手に伝わる文章へまとめられます。', ['採用広報', 'Webサイト']),
    theme('話す', 2, 1, '今は避けたい', '大人数への説明には苦手意識があります。', ['社内共有'], 'assigner'),
  ]},
  { id: 'm7', name: '中村 陸', email: 'nakamura@example.com', initials: '中', roleLabel: 'アシスタントデザイナー', role: 'member', updatedAt: '2026-07-14', accent: '#557DA9', active: true, direction: '制作だけでなく、使われ続ける仕組みを考えたい', overall: { x: 48, y: 82, comment: 'まず手を動かして試し、レビューを受けながら育てたいです。' }, voices: [], themes: [
    theme('整える', 2, 3, '挑戦したい', 'テンプレートを整えて手間を減らす仕事に関心があります。', ['Notion', '資料テンプレート']),
    theme('つくる', 2, 3, '支援があれば挑戦したい', 'レビューを受けながら試作品を作りたいです。', ['Figma']),
    theme('教える', 1, 2, 'まだ分からない', 'まだ教える経験はありません。', ['社内共有']),
  ]},
  { id: 'm8', name: '鈴木 美咲', email: 'suzuki@example.com', initials: '鈴', roleLabel: 'デザイン部長', role: 'admin', updatedAt: '2026-07-03', accent: '#405476', active: true, direction: '一人ひとりが挑戦しやすいチームをつくりたい', overall: { x: 76, y: 62, comment: '人と話しながら方向を決め、チームが動きやすい状態をつくります。' }, voices: [], themes: [
    theme('進める', 5, 4, '活かしたい', '情報が揃いきらない状況でも、次の一歩を決められます。', ['企画設計', 'マネジメント']),
    theme('教える', 5, 4, '活かしたい', '挑戦する人の壁打ちやレビューに時間を使いたいです。', ['レビュー', '1on1']),
    theme('進める', 4, 4, '機会があれば', '関係者と順番を整理して、進め方を作れます。', ['プロジェクト設計']),
  ]},
];
