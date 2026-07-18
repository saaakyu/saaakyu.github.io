import type { Member, ThemeDefinition, ThemeEntry } from './types';

export const themeDefinitions: ThemeDefinition[] = [
  ['プレゼン','伝える','人前で考えや提案を分かりやすく話す'],['顧客説明','伝える','顧客や他部署に意図や背景を説明する'],['営業資料','伝える','提案や商談で使う資料を設計する'],
  ['SNS発信','書く','短い文章で情報や魅力を届ける'],['コピー','書く','短い言葉で価値や印象を伝える'],['採用広報','書く','会社やチームの魅力を文章にする'],['UI文言','書く','画面上の言葉を分かりやすく整える'],
  ['情報設計','考える','複雑な情報を構造化し、理解しやすくする'],['要件整理','考える','目的や条件を整理して進め方を考える'],['改善案','考える','現状からより良い案を考える'],
  ['UIデザイン','作る','画面や操作体験を具体的な形にする'],['資料デザイン','作る','情報を読みやすい資料として形にする'],['プロトタイプ','作る','試せる形を早めにつくる'],['Webデザイン','作る','Web上の見た目や体験を設計する'],
  ['インタビュー','探る','相手の話から背景や課題を聞き出す'],['ユーザーリサーチ','探る','使う人の状況や課題を調べる'],
  ['レビュー','教える','相手の制作物や考えを見て、次に進める助言をする'],['勉強会','教える','知っていることをチームに共有する'],
].map(([name,category,description],order)=>({id:`theme-${order+1}`,name,category,description,active:true,order}));

const theme = (
  name: string,
  experience: ThemeEntry['experience'],
  comfort: ThemeEntry['comfort'],
  intent: ThemeEntry['intent'],
  comment: string,
  tags: string[],
): ThemeEntry => ({
  name,
  category: themeDefinitions.find((item) => item.name === name)?.category ?? 'その他',
  experience,
  comfort,
  intent,
  comment,
  tags,
});

const profile = (headerColor: string, bio: string, interests: string) => ({ headerColor, bio, interests });

export const seedMembers: Member[] = [
  { id: 'm1', name: '山田 花子', email: 'hanako@example.com', initials: '山', roleLabel: 'シニアデザイナー', role: 'member', updatedAt: '2026-07-12', accent: '#6376C4', active: true, direction: '企画と表現をつなぐ仕事を増やしたい', ...profile('#e8edff','情報をほどいて、相手が動きやすい形にするのが好きです。','新規サービス、企画初期、提案ストーリー'), overall: { x: 28, y: 68, comment: '一人で整理してから、早めに周囲へ共有する進め方が合っています。' }, voices: [], themes: [
    theme('情報設計', 4, 4, '活かしたい', '複雑な情報を、相手に合わせて整理することは自然にできます。', ['構成整理', '営業資料']),
    theme('プレゼン', 3, 2, '機会があれば', '準備する時間があれば、自分の言葉で説明できます。', ['顧客説明']),
    theme('ユーザーリサーチ', 2, 3, '挑戦したい', '企画の初期から問いを考える経験を増やしたいです。', ['サービスデザイン']),
  ]},
  { id: 'm2', name: '田中 花子', email: 'tanaka@example.com', initials: '田', roleLabel: 'デザイナー', role: 'member', updatedAt: '2026-07-15', accent: '#D47861', active: true, direction: '情報を伝わる形にして、提案を支えたい', ...profile('#fff0ea','言葉とビジュアルの間を行き来しながら、伝わりやすさを考えます。','コピー、資料、採用広報'), overall: { x: 43, y: 36, comment: '集中して形にする時間を大切にしつつ、伝える経験も増やしたいです。' }, voices: [], themes: [
    theme('プレゼン', 2, 2, '挑戦したい', '少し緊張しますが、顧客への説明経験を増やしたいです。', ['社内共有']),
    theme('コピー', 4, 4, '活かしたい', '短い言葉で要点を伝えることが好きです。', ['コピーライティング', '資料構成']),
    theme('資料デザイン', 4, 4, '活かしたい', 'まとまった時間があると、集中して品質を上げられます。', ['営業資料', 'Webデザイン']),
  ]},
  { id: 'm3', name: '佐藤 健', email: 'sato@example.com', initials: '佐', roleLabel: 'デザインリーダー', role: 'assigner', updatedAt: '2026-07-10', accent: '#3C8A70', active: true, direction: 'チームが継続的に改善できる仕組みをつくりたい', ...profile('#e6f4ee','レビューや仕組みづくりを通じて、チームが動きやすい状態をつくります。','レビュー、デザインシステム、オンボーディング'), overall: { x: 70, y: 42, comment: '人と認識をそろえながら、続けられる形へ整えることが多いです。' }, voices: [], themes: [
    theme('レビュー', 5, 4, '活かしたい', '答えを渡すより、一緒に考えるレビューを大切にしています。', ['デザインレビュー', 'オンボーディング']),
    theme('UIデザイン', 5, 4, '活かしたい', '運用まで含めて、続けられる形を考えられます。', ['デザインシステム', 'ガイドライン']),
    theme('プレゼン', 4, 3, '今は減らしたい', '経験はありますが、今はチーム支援に時間を使いたいです。', ['提案説明']),
  ]},
  { id: 'm4', name: '高橋 葵', email: 'aoi@example.com', initials: '高', roleLabel: 'UIデザイナー', role: 'member', updatedAt: '2026-07-16', accent: '#8B69AF', active: true, direction: 'プロダクトの体験全体を設計できるようになりたい', ...profile('#f0eafd','まず触れる形にして、対話しながら体験を育てるのが好きです。','UI、プロトタイプ、UXリサーチ'), overall: { x: 38, y: 78, comment: 'まず試作品をつくり、触りながら考えると力を出しやすいです。' }, voices: [], themes: [
    theme('プロトタイプ', 4, 4, '活かしたい', '早い段階で触れる形にして、対話を始めるのが得意です。', ['Figma']),
    theme('インタビュー', 2, 2, '支援があれば挑戦したい', 'インタビュー設計のレビューがあれば挑戦したいです。', ['UXリサーチ']),
    theme('UIデザイン', 4, 4, '活かしたい', '画面の一貫性や細かな違和感によく気付きます。', ['画面設計']),
  ]},
  { id: 'm5', name: '伊藤 直樹', email: 'ito@example.com', initials: '伊', roleLabel: 'デザイナー', role: 'member', updatedAt: '2026-06-21', accent: '#B4823F', active: true, direction: '制作経験を、一貫したブランドづくりへ広げたい', ...profile('#fff4df','細部まで整える制作と、ブランドの一貫性を大切にしています。','グラフィック、展示会、ブランド'), overall: { x: 22, y: 30, comment: 'じっくり手を動かし、細部まで整える時間を大切にしています。' }, voices: [], themes: [
    theme('資料デザイン', 5, 4, '機会があれば', '印刷物やグラフィックの最終品質を整えられます。', ['グラフィック', '展示会']),
    theme('Webデザイン', 5, 3, '今は減らしたい', '制作経験はありますが、同種の量産が続かないようにしたいです。', ['Adobe CC']),
    theme('改善案', 2, 3, '挑戦したい', 'ブランドの初期段階から案を広げる経験を増やしたいです。', ['ブランドデザイン']),
  ]},
  { id: 'm6', name: '小林 美咲', email: 'kobayashi@example.com', initials: '小', roleLabel: 'デザイナー', role: 'member', updatedAt: '2026-07-08', accent: '#40859A', active: true, direction: '人の声から、伝わるブランド体験をつくりたい', ...profile('#e6f5f7','人の話を聞いて、その人らしい言葉や表現に整えることが好きです。','インタビュー、採用広報、文章'), overall: { x: 58, y: 66, comment: '人の話を聞いて深掘りし、言葉や形にして返すことが好きです。' }, voices: [], themes: [
    theme('インタビュー', 4, 4, '活かしたい', '話を聞きながら、その人らしい言葉を見つけるのが好きです。', ['UXリサーチ']),
    theme('採用広報', 3, 4, '活かしたい', '聞いた内容を、読み手に伝わる文章へまとめられます。', ['Webサイト']),
    theme('プレゼン', 2, 1, '今は避けたい', '大人数への説明には苦手意識があります。', ['社内共有']),
  ]},
  { id: 'm7', name: '中村 陸', email: 'nakamura@example.com', initials: '中', roleLabel: 'アシスタントデザイナー', role: 'member', updatedAt: '2026-07-14', accent: '#557DA9', active: true, direction: '制作だけでなく、使われ続ける仕組みを考えたい', ...profile('#e8f0fb','レビューを受けながら、試作品や運用しやすい形を増やしたいです。','プロトタイプ、テンプレート、UI'), overall: { x: 48, y: 82, comment: 'まず手を動かして試し、レビューを受けながら育てたいです。' }, voices: [], themes: [
    theme('要件整理', 2, 3, '挑戦したい', 'テンプレートを整えて手間を減らす仕事に関心があります。', ['Notion', '資料テンプレート']),
    theme('プロトタイプ', 2, 3, '支援があれば挑戦したい', 'レビューを受けながら試作品を作りたいです。', ['Figma']),
    theme('勉強会', 1, 2, 'まだ分からない', 'まだ教える経験はありません。', ['社内共有']),
  ]},
  { id: 'm8', name: '鈴木 美咲', email: 'suzuki@example.com', initials: '鈴', roleLabel: 'デザイン部長', role: 'admin', updatedAt: '2026-07-03', accent: '#405476', active: true, direction: '一人ひとりが挑戦しやすいチームをつくりたい', ...profile('#e8ebf3','チーム全体を見ながら、一人ひとりが挑戦しやすい余白を探します。','チームづくり、レビュー、1on1'), overall: { x: 76, y: 62, comment: '人と話しながら方向を決め、チームが動きやすい状態をつくります。' }, voices: [], themes: [
    theme('要件整理', 5, 4, '活かしたい', '情報が揃いきらない状況でも、次の一歩を決められます。', ['企画設計', 'マネジメント']),
    theme('レビュー', 5, 4, '活かしたい', '挑戦する人の壁打ちやレビューに時間を使いたいです。', ['1on1']),
    theme('顧客説明', 4, 4, '機会があれば', '関係者と順番を整理して、進め方を作れます。', ['プロジェクト設計']),
  ]},
];
