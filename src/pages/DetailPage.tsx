import { ArrowLeft, CalendarDays, Edit3, MessageCircle } from 'lucide-react';
import type { Route } from '../App';
import { useStore } from '../store';
import type { SkillIntent, Visibility } from '../types';

const levelLabels = [
  '',
  '学んでいる途中',
  'サポートがあれば取り組める',
  '一人で対応できる',
  '支援・レビューできる',
  '進め方やルールを設計できる',
];

const intentGroups: { title: string; intents: SkillIntent[] }[] = [
  { title: '得意を活かしたい', intents: ['活かしたい', '機会があれば'] },
  { title: '次に挑戦したい', intents: ['挑戦したい', '支援があれば'] },
  { title: '経験はあるが、今は減らしたい', intents: ['今は減らしたい'] },
  { title: '今は避けたい', intents: ['今は避けたい'] },
];

export default function DetailPage({ id, navigate }: { id: string; navigate: (route: Route) => void }) {
  const { members, currentUser } = useStore();
  const member = members.find((item) => item.id === id);
  if (!member || !currentUser) return null;

  const isOwner = member.id === currentUser.id;
  const canSee = (visibility: Visibility) =>
    isOwner || visibility === 'team' ||
    (visibility === 'assigner' && currentUser.role !== 'member');
  const skills = member.skills.filter((entry) => canSee(entry.visibility));

  return (
    <div className="page-wrap member-detail">
      <button className="back-button" onClick={() => navigate({ page: 'map' })}>
        <ArrowLeft /> チームマップに戻る
      </button>

      <section className="member-header">
        <span className="avatar large" style={{ background: member.accent }}>{member.initials}</span>
        <div>
          <p>{member.roleLabel}</p>
          <h1>{member.name}</h1>
          <span className={`capacity capacity-${member.capacity}`}>{member.capacity}</span>
        </div>
        {isOwner && (
          <button className="primary-button" onClick={() => navigate({ page: 'profile' })}>
            <Edit3 /> プロフィールを編集
          </button>
        )}
      </section>

      <section className="direction-panel">
        <h2>これから大切にしたいこと</h2>
        <p>{member.direction}</p>
        <span><CalendarDays /> {new Date(member.updatedAt).toLocaleDateString('ja-JP')}に本人が確認</span>
      </section>

      <div className="member-content">
        <div>
          {intentGroups.map((group) => {
            const entries = skills.filter((entry) => group.intents.includes(entry.intent));
            if (!entries.length) return null;
            return (
              <section className="profile-section" key={group.title}>
                <h2>{group.title}</h2>
                <div className="profile-skill-list">
                  {entries.map((entry) => (
                    <article key={entry.name}>
                      <div className="profile-skill-title">
                        <div>
                          <span>{entry.category}</span>
                          <h3>{entry.name}</h3>
                        </div>
                        <span className={`intent-tag intent-tag-${entry.intent}`}>{entry.intent}</span>
                      </div>
                      <p>{entry.comment}</p>
                      <small>経験の目安：{levelLabels[entry.level]}</small>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <aside className="member-side">
          <section>
            <h2>プロフィールについて</h2>
            <dl>
              <div><dt>共有されているスキル</dt><dd>{skills.length}件</dd></div>
              <div><dt>現在の余力</dt><dd>{member.capacity}</dd></div>
              <div><dt>最終確認</dt><dd>{new Date(member.updatedAt).toLocaleDateString('ja-JP')}</dd></div>
            </dl>
          </section>
          {!isOwner && currentUser.role !== 'member' && (
            <section className="feedback-guide">
              <MessageCircle />
              <h2>認識を合わせたいとき</h2>
              <p>本人の登録内容は変更せず、具体的な出来事を本人へ伝えて話してみましょう。</p>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
