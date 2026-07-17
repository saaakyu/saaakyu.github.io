import { useState } from 'react';
import { ChevronRight, Search, X } from 'lucide-react';
import type { Route } from '../App';
import { useStore } from '../store';
import type { Member, SkillEntry, SkillIntent, Visibility } from '../types';

const experienceLabels = [
  '学んでいる途中',
  'サポートがあれば',
  '一人で対応',
  '支援・レビュー',
  '進め方を設計',
];

const intentRows: { label: string; intents: SkillIntent[] }[] = [
  { label: '活かしたい・挑戦したい', intents: ['活かしたい', '挑戦したい'] },
  { label: '機会や支援があれば', intents: ['機会があれば', '支援があれば'] },
  { label: '今は減らしたい', intents: ['今は減らしたい'] },
  { label: '今は避けたい', intents: ['今は避けたい'] },
];

interface MapEntry {
  member: Member;
  skill: SkillEntry;
}

export default function TeamMapPage({
  initialSkill,
  navigate,
}: {
  initialSkill?: string;
  navigate: (route: Route) => void;
}) {
  const { members, currentUser } = useStore();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('すべて');
  const [selectedSkill, setSelectedSkill] = useState(initialSkill ?? 'UIデザイン');
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  const canSee = (visibility: Visibility, ownerId: string) =>
    ownerId === currentUser?.id || visibility === 'team' ||
    (visibility === 'assigner' && currentUser?.role !== 'member');

  const skillGroups = (() => {
    const groups = new Map<string, { category: string; entries: MapEntry[] }>();
    members.filter((member) => member.active).forEach((member) => {
      member.skills.filter((skill) => canSee(skill.visibility, member.id)).forEach((skill) => {
        const group = groups.get(skill.name) ?? { category: skill.category, entries: [] };
        group.entries.push({ member, skill });
        groups.set(skill.name, group);
      });
    });
    return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b, 'ja'));
  })();

  const categories = ['すべて', ...new Set(skillGroups.map(([, group]) => group.category))];
  const visibleSkills = skillGroups.filter(([name, group]) =>
    name.includes(query) && (category === 'すべて' || group.category === category));
  const activeSkill = skillGroups.find(([name]) => name === selectedSkill) ?? visibleSkills[0];
  const selectedEntry = activeSkill?.[1].entries.find(({ member }) => member.id === selectedMemberId);

  const selectSkill = (name: string) => {
    setSelectedSkill(name);
    setSelectedMemberId(null);
  };

  return (
    <div className="map-page">
      <section className="map-page-heading">
        <div>
          <h1>チームのスキル</h1>
          <p>スキルを選ぶと、チームの経験とこれからの意向が見られます。</p>
        </div>
        <p className="self-report-note">本人が登録した内容を表示しています</p>
      </section>

      <div className="map-workspace">
        <aside className="skill-navigation" aria-label="スキル一覧">
          <div className="skill-search">
            <Search />
            <input
              aria-label="スキルを検索"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="スキルを検索"
            />
          </div>
          <div className="category-tabs" aria-label="カテゴリー">
            {categories.map((item) => (
              <button
                className={category === item ? 'selected' : ''}
                key={item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="compact-skill-list">
            {visibleSkills.map(([name, group]) => {
              const wants = group.entries.filter(({ skill }) =>
                ['活かしたい', '挑戦したい', '支援があれば'].includes(skill.intent)).length;
              return (
                <button
                  className={activeSkill?.[0] === name ? 'selected' : ''}
                  key={name}
                  onClick={() => selectSkill(name)}
                >
                  <span><strong>{name}</strong><small>{group.category}</small></span>
                  <span className="skill-count">{group.entries.length}人</span>
                  {wants > 0 && <span className="interest-dot" aria-label={`関わりたい人${wants}人`} />}
                </button>
              );
            })}
            {visibleSkills.length === 0 && <p className="list-empty">該当するスキルはありません。</p>}
          </div>
        </aside>

        {activeSkill && (
          <section className="skill-map-area">
            <header className="skill-map-header">
              <div><span>{activeSkill[1].category}</span><h2>{activeSkill[0]}</h2></div>
              <p>{activeSkill[1].entries.length}人が登録</p>
            </header>

            <div className="axis-caption axis-y">これからの意向</div>
            <div className="matrix-wrap">
              <div className="matrix-corner" />
              {experienceLabels.map((label) => <div className="experience-label" key={label}>{label}</div>)}
              {intentRows.map((row) => (
                <div className="matrix-row" key={row.label}>
                  <div className="intent-label">{row.label}</div>
                  {experienceLabels.map((_, levelIndex) => {
                    const entries = activeSkill[1].entries.filter(({ skill }) =>
                      skill.level === levelIndex + 1 && row.intents.includes(skill.intent));
                    return (
                      <div className={`matrix-cell matrix-row-${intentRows.indexOf(row)}`} key={levelIndex}>
                        {entries.map(({ member, skill }) => (
                          <button
                            className={`matrix-person ${selectedMemberId === member.id ? 'selected' : ''}`}
                            key={member.id}
                            title={`${member.name}：${skill.intent}`}
                            onClick={() => setSelectedMemberId(member.id)}
                          >
                            <span className="avatar" style={{ background: member.accent }}>{member.initials}</span>
                            <span>{member.name.split(' ')[0]}</span>
                          </button>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="axis-caption axis-x">経験の目安 <span>→</span></div>

            {selectedEntry && (
              <aside className="map-inspector">
                <button className="inspector-close" onClick={() => setSelectedMemberId(null)} aria-label="詳細を閉じる"><X /></button>
                <div className="inspector-person">
                  <span className="avatar" style={{ background: selectedEntry.member.accent }}>{selectedEntry.member.initials}</span>
                  <div><h3>{selectedEntry.member.name}</h3><p>{selectedEntry.member.roleLabel}</p></div>
                </div>
                <dl>
                  <div><dt>経験の目安</dt><dd>{experienceLabels[selectedEntry.skill.level - 1]}</dd></div>
                  <div><dt>これからの意向</dt><dd>{selectedEntry.skill.intent}</dd></div>
                </dl>
                <blockquote>「{selectedEntry.skill.comment}」</blockquote>
                <button className="profile-link" onClick={() => navigate({ page: 'member', id: selectedEntry.member.id })}>
                  プロフィール全体を見る <ChevronRight />
                </button>
              </aside>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
