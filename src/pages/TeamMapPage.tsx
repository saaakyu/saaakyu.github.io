import { useState } from 'react';
import { ChevronRight, Search, SlidersHorizontal, Users } from 'lucide-react';
import type { Route } from '../App';
import { useStore } from '../store';
import type { SkillEntry, SkillIntent, Visibility } from '../types';

const intentOrder: SkillIntent[] = [
  '活かしたい', '挑戦したい', '支援があれば', '機会があれば', '今は減らしたい', '今は避けたい',
];

const intentDescription: Record<SkillIntent, string> = {
  活かしたい: '経験をこれからも活かしたい',
  挑戦したい: '実務で経験を増やしたい',
  支援があれば: 'サポートと一緒に挑戦したい',
  機会があれば: '必要なときに経験を活かせる',
  今は減らしたい: '経験はあるが、今は量を減らしたい',
  今は避けたい: '現在は優先したくない',
};

export default function TeamMapPage({
  initialSkill,
  navigate,
}: {
  initialSkill?: string;
  navigate: (route: Route) => void;
}) {
  const { members, currentUser } = useStore();
  const [query, setQuery] = useState(initialSkill ?? '');
  const [category, setCategory] = useState('すべて');
  const [intent, setIntent] = useState<SkillIntent | 'すべて'>('すべて');

  const canSee = (visibility: Visibility, ownerId: string) =>
    ownerId === currentUser?.id || visibility === 'team' ||
    (visibility === 'assigner' && currentUser?.role !== 'member');

  const visibleMembers = members.filter((member) => member.active);
  const categories = ['すべて', ...new Set(visibleMembers.flatMap((m) => m.skills.map((s) => s.category)))];

  const grouped = (() => {
    const map = new Map<string, { category: string; entries: { memberId: string; entry: SkillEntry }[] }>();
    visibleMembers.forEach((member) => {
      member.skills.filter((entry) => canSee(entry.visibility, member.id)).forEach((entry) => {
        const current = map.get(entry.name) ?? { category: entry.category, entries: [] };
        current.entries.push({ memberId: member.id, entry });
        map.set(entry.name, current);
      });
    });
    return [...map.entries()]
      .filter(([name, value]) =>
        name.includes(query) &&
        (category === 'すべて' || value.category === category) &&
        (intent === 'すべて' || value.entries.some(({ entry }) => entry.intent === intent)))
      .sort(([a], [b]) => a.localeCompare(b, 'ja'));
  })();

  return (
    <div className="page-wrap">
      <section className="page-heading">
        <div>
          <h1>チームマップ</h1>
          <p>経験とこれからの意向を見て、誰と話してみるか考えます。</p>
        </div>
        <div className="map-summary">
          <Users />
          <span><strong>{visibleMembers.length}人</strong>の共有プロフィール</span>
        </div>
      </section>

      <div className="map-toolbar">
        <label className="search-field">
          <Search />
          <input
            aria-label="スキルを検索"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="スキルを検索"
          />
        </label>
        <label className="select-field">
          <SlidersHorizontal />
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label className="select-field">
          <select value={intent} onChange={(event) => setIntent(event.target.value as SkillIntent | 'すべて')}>
            <option>すべて</option>
            {intentOrder.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
      </div>

      {grouped.length === 0 ? (
        <div className="empty-state">
          <h2>該当するスキルがありません</h2>
          <p>検索条件を変えて確認してみてください。</p>
          <button onClick={() => { setQuery(''); setCategory('すべて'); setIntent('すべて'); }}>
            条件をクリア
          </button>
        </div>
      ) : (
        <div className="skill-sections">
          {grouped.map(([skillName, group]) => (
            <section className="skill-section" key={skillName}>
              <header>
                <div>
                  <p>{group.category}</p>
                  <h2>{skillName}</h2>
                </div>
                <span>{group.entries.length}人が登録</span>
              </header>
              <div className="intent-columns">
                {intentOrder.map((intentName) => {
                  const entries = group.entries.filter(({ entry }) => entry.intent === intentName);
                  if (!entries.length) return null;
                  return (
                    <div className={`intent-column intent-${intentName}`} key={intentName}>
                      <div className="intent-heading">
                        <strong>{intentName}</strong>
                        <span>{intentDescription[intentName]}</span>
                      </div>
                      {entries.map(({ memberId, entry }) => {
                        const member = visibleMembers.find((item) => item.id === memberId)!;
                        return (
                          <button
                            className="map-person"
                            key={memberId}
                            onClick={() => navigate({ page: 'member', id: memberId })}
                          >
                            <span className="avatar" style={{ background: member.accent }}>{member.initials}</span>
                            <span className="map-person-copy">
                              <strong>{member.name}</strong>
                              <span>{entry.comment}</span>
                            </span>
                            <span className={`capacity capacity-${member.capacity}`}>{member.capacity}</span>
                            <ChevronRight />
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
