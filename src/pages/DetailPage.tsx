import { ArrowLeft, CalendarDays, Edit3 } from 'lucide-react';
import type { Route } from '../App';
import SkillMeter from '../components/SkillMeter';
import { useStore } from '../store';
import type { Visibility } from '../types';

const experienceLabels = ['まだ経験がない', '少し経験した', '複数回経験した', '継続的に経験している', '他の人を支援できる'];
const comfortLabels = ['苦手意識がある', '少し不安がある', '比較的取り組みやすい', '自然に取り組める'];

export default function DetailPage({ id, navigate }: { id: string; navigate: (route: Route) => void }) {
  const { members, currentUser } = useStore();
  const member = members.find((item) => item.id === id);
  if (!member || !currentUser) return null;
  const isOwner = member.id === currentUser.id;
  const canSee = (visibility: Visibility) => isOwner || visibility === 'team' || (visibility === 'assigner' && currentUser.role !== 'member');
  const themes = member.themes.filter((theme) => canSee(theme.visibility));

  return <div className="page-wrap member-detail">
    <button className="back-button" onClick={() => navigate({ page: 'map' })}><ArrowLeft />チームマップに戻る</button>
    <section className="member-header"><span className="avatar large" style={{ background: member.accent }}>{member.initials}</span><div><p>{member.roleLabel}</p><h1>{member.name}</h1></div>{isOwner && <button className="primary-button" onClick={() => navigate({ page: 'profile' })}><Edit3 />プロフィールを編集</button>}</section>
    <section className="direction-panel"><h2>これから大切にしたいこと</h2><p>{member.direction}</p><span><CalendarDays />{new Date(member.updatedAt).toLocaleDateString('ja-JP')}に本人が確認</span></section>
    <section className="profile-section"><div className="section-title-row"><h2>仕事のテーマ</h2><span>{themes.length}件を共有</span></div><div className="profile-skill-list">{themes.map((theme) => <article key={theme.name} onClick={() => navigate({ page: 'map', skill: theme.name })}><div className="profile-skill-title"><div><span>{theme.category}</span><h3>{theme.name}</h3></div><span className="intent-tag">{theme.intent}</span></div><p>{theme.comment}</p><div className="theme-facts meter-stack compact"><SkillMeter label="経験" value={theme.experience} max={5} text={experienceLabels[theme.experience - 1]} /><SkillMeter label="取り組みやすさ" value={theme.comfort} max={4} text={comfortLabels[theme.comfort - 1]} tone="green" /></div><div className="tag-list">{theme.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></article>)}</div></section>
  </div>;
}
