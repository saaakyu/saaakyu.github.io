import { useState, type DragEvent } from 'react';
import { ChevronRight, Edit3, Search, Undo2, X } from 'lucide-react';
import type { Route } from '../App';
import { useStore } from '../store';
import type {
  ComfortLevel,
  ExperienceLevel,
  ExperienceVoice,
  Member,
  ThemeEntry,
  ThemeIntent,
  Visibility,
} from '../types';

const experienceLabels = ['まだ経験がない', '少し経験した', '複数回経験した', '継続的に経験', '人を支援できる'];
const comfortLabels = ['自然に取り組める', '比較的取り組みやすい', '少し不安がある', '苦手意識がある'];
const intentClass: Record<ThemeIntent, string> = {
  活かしたい: 'positive', 挑戦したい: 'challenge', 支援があれば挑戦したい: 'challenge',
  機会があれば: 'neutral', 今は減らしたい: 'reduce', 今は避けたい: 'avoid',
  今後も優先したくない: 'avoid', まだ分からない: 'neutral',
};

interface MapEntry { member: Member; theme: ThemeEntry }
interface UndoState { member: Member; previous?: ThemeEntry; themeName: string }

export default function TeamMapPage({ initialSkill, navigate }: { initialSkill?: string; navigate: (route: Route) => void }) {
  const { members, currentUser, saveMember, sendVoice, removeVoice, themeDefinitions } = useStore();
  const [view, setView] = useState<'current' | 'themes'>('current');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('すべて');
  const [selectedTheme, setSelectedTheme] = useState(initialSkill ?? '人前で話す');
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [undoState, setUndoState] = useState<UndoState | null>(null);
  const [lastVoice, setLastVoice] = useState<{ memberId: string; voiceId: string; name: string } | null>(null);

  if (!currentUser) return null;
  const activeMembers = members.filter((member) => member.active);
  const definition = themeDefinitions.find((item) => item.name === selectedTheme) ?? themeDefinitions[0];
  const canSee = (visibility: Visibility, ownerId: string) =>
    ownerId === currentUser.id || visibility === 'team' ||
    (visibility === 'assigner' && currentUser.role !== 'member');
  const entries: MapEntry[] = activeMembers.flatMap((member) => {
    const theme = member.themes.find((item) => item.name === definition.name && canSee(item.visibility, member.id));
    return theme ? [{ member, theme }] : [];
  });
  const unregistered = activeMembers.filter((member) => !entries.some((entry) => entry.member.id === member.id));
  const selectedEntry = entries.find((entry) => entry.member.id === selectedMemberId);
  const categories = ['すべて', ...new Set(themeDefinitions.map((item) => item.category))];
  const visibleThemes = themeDefinitions.filter((item) =>
    item.name.includes(query) && (category === 'すべて' || item.category === category));

  const placeCurrentUser = (experience: ExperienceLevel, comfort: ComfortLevel) => {
    const previous = currentUser.themes.find((item) => item.name === definition.name);
    const next: ThemeEntry = previous
      ? { ...previous, experience, comfort }
      : {
          name: definition.name, category: definition.category, experience, comfort,
          intent: 'まだ分からない', comment: '', tags: [], visibility: 'team',
        };
    saveMember({
      ...currentUser,
      updatedAt: new Date().toISOString().slice(0, 10),
      themes: [...currentUser.themes.filter((item) => item.name !== definition.name), next],
    });
    setSelectedMemberId(currentUser.id);
    setUndoState({ member: currentUser, previous, themeName: definition.name });
    setDragging(false);
  };

  const undo = () => {
    if (!undoState) return;
    const themes = undoState.previous
      ? [...undoState.member.themes.filter((item) => item.name !== undoState.themeName), undoState.previous]
      : undoState.member.themes.filter((item) => item.name !== undoState.themeName);
    saveMember({ ...undoState.member, themes });
    setUndoState(null);
  };

  const openTheme = (name: string) => {
    setView('themes');
    setSelectedTheme(name);
    setSelectedMemberId(null);
    setUndoState(null);
  };

  const sendQuickVoice = (entry: MapEntry, reaction: string) => {
    const voice: ExperienceVoice = { id: crypto.randomUUID(), theme: entry.theme.name, kind: reaction, message: '', fromId: currentUser.id, fromName: currentUser.name, date: new Date().toISOString(), read: false };
    sendVoice(entry.member.id, voice);
    setLastVoice({ memberId: entry.member.id, voiceId: voice.id, name: entry.member.name.split(' ')[0] });
  };

  if (view === 'current') return <div className="map-page">
    <MapPageHeading view={view} setView={setView} />
    <OverallMap members={activeMembers} currentUser={currentUser} saveMember={saveMember} navigate={navigate} sendVoice={(member, reaction) => {
      const voice: ExperienceVoice = { id: crypto.randomUUID(), theme: 'チームの現在地', kind: reaction, message: '', fromId: currentUser.id, fromName: currentUser.name, date: new Date().toISOString(), read: false };
      sendVoice(member.id, voice); setLastVoice({ memberId: member.id, voiceId: voice.id, name: member.name.split(' ')[0] });
    }} />
    {lastVoice && <VoiceToast name={lastVoice.name} onUndo={() => { removeVoice(lastVoice.memberId, lastVoice.voiceId); setLastVoice(null); }} />}
  </div>;

  return (
    <div className="map-page">
      <MapPageHeading view={view} setView={setView} />

      <div className="map-workspace">
        <aside className="skill-navigation" aria-label="仕事のテーマ一覧">
          <div className="skill-search"><Search /><input aria-label="テーマを検索" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="テーマを検索" /></div>
          <div className="category-tabs" aria-label="カテゴリー">
            {categories.map((item) => <button className={category === item ? 'selected' : ''} key={item} onClick={() => setCategory(item)}>{item}</button>)}
          </div>
          <div className="compact-skill-list">
            {visibleThemes.map((item) => {
              const count = activeMembers.filter((member) => member.themes.some((theme) => theme.name === item.name)).length;
              return <button className={definition.name === item.name ? 'selected' : ''} key={item.name} onClick={() => openTheme(item.name)}><span><strong>{item.name}</strong><small>{item.category}</small></span><span className="skill-count">{count}人</span></button>;
            })}
          </div>
        </aside>

        <section className="skill-map-area">
          <header className="skill-map-header">
            <div><span>{definition.category}</span><h2>{definition.name}</h2><p>{definition.description}</p></div>
            <div className="map-legend"><span><i className="legend-self" />自分</span><span><i className="legend-voice" />経験の声あり</span></div>
          </header>

          <p className="axis-title-y">本人の感覚</p>
          <div className={`matrix-wrap ${dragging ? 'is-dragging' : ''}`}>
            <div className="matrix-corner" />
            {experienceLabels.map((label) => <div className="experience-label" key={label}>{label}</div>)}
            {comfortLabels.map((comfortLabel, rowIndex) => {
              const comfort = (4 - rowIndex) as ComfortLevel;
              return <div className="matrix-row" key={comfortLabel}>
                <div className="intent-label">{comfortLabel}</div>
                {experienceLabels.map((_, columnIndex) => {
                  const experience = (columnIndex + 1) as ExperienceLevel;
                  const cellEntries = entries.filter((entry) => entry.theme.experience === experience && entry.theme.comfort === comfort);
                  return <div
                    className={`matrix-cell comfort-${comfort}`}
                    key={experience}
                    onDragOver={(event) => { if (dragging) event.preventDefault(); }}
                    onDrop={(event) => { event.preventDefault(); placeCurrentUser(experience, comfort); }}
                  >
                    {cellEntries.map((entry) => {
                      const isSelf = entry.member.id === currentUser.id;
                      return <button
                        className={`matrix-person ${isSelf ? 'is-self' : ''} ${selectedMemberId === entry.member.id ? 'selected' : ''}`}
                        draggable={isSelf}
                        key={entry.member.id}
                        onDragStart={() => { if (isSelf) setDragging(true); }}
                        onDragEnd={() => setDragging(false)}
                        onClick={() => setSelectedMemberId(entry.member.id)}
                      >
                        <span className="avatar" style={{ background: entry.member.accent }}>{entry.member.initials}</span>
                        <span>{entry.member.name.split(' ')[0]}</span>
                        <small className={`intent-pill ${intentClass[entry.theme.intent]}`}>{entry.theme.intent}</small>
                        {entry.member.voices.some((voice) => voice.theme === definition.name) && <i className="voice-marker" aria-label="経験の声あり" />}
                      </button>;
                    })}
                  </div>;
                })}
              </div>;
            })}
          </div>
          <p className="axis-title-x">経験の積み重ね <span>→</span></p>

          <div className="unregistered-area">
            <div><strong>まだ位置を登録していないメンバー</strong><span>{unregistered.length}人</span></div>
            <div className="unregistered-people">
              {unregistered.map((member) => <button
                className={member.id === currentUser.id ? 'is-self' : ''}
                draggable={member.id === currentUser.id}
                key={member.id}
                onDragStart={() => { if (member.id === currentUser.id) setDragging(true); }}
                onDragEnd={() => setDragging(false)}
                onClick={() => setSelectedMemberId(member.id)}
              ><span className="avatar" style={{ background: member.accent }}>{member.initials}</span>{member.name}</button>)}
            </div>
            {unregistered.some((member) => member.id === currentUser.id) && <p>自分のアイコンをマップへドラッグして、近いと感じる場所に置けます。</p>}
          </div>

          {selectedEntry && <MapInspector
            entry={selectedEntry}
            canSendVoice={selectedEntry.member.id !== currentUser.id}
            onClose={() => setSelectedMemberId(null)}
            onProfile={() => navigate({ page: 'member', id: selectedEntry.member.id })}
            onVoice={(reaction) => sendQuickVoice(selectedEntry, reaction)}
          />}
        </section>
      </div>

      {undoState && <div className="undo-toast">位置を更新しました<button onClick={undo}><Undo2 />元に戻す</button></div>}
      {lastVoice && <VoiceToast name={lastVoice.name} onUndo={() => { removeVoice(lastVoice.memberId, lastVoice.voiceId); setLastVoice(null); }} />}
    </div>
  );
}

function MapInspector({ entry, canSendVoice, onClose, onProfile, onVoice }: { entry: MapEntry; canSendVoice: boolean; onClose: () => void; onProfile: () => void; onVoice: (reaction: string) => void }) {
  return <aside className="map-inspector">
    <button className="inspector-close" onClick={onClose} aria-label="詳細を閉じる"><X /></button>
    <div className="inspector-person"><span className="avatar" style={{ background: entry.member.accent }}>{entry.member.initials}</span><div><h3>{entry.member.name}</h3><p>{entry.member.roleLabel}</p></div></div>
    <dl><div><dt>経験</dt><dd>{experienceLabels[entry.theme.experience - 1]}</dd></div><div><dt>本人の感覚</dt><dd>{comfortLabels[4 - entry.theme.comfort]}</dd></div><div><dt>これから</dt><dd>{entry.theme.intent}</dd></div></dl>
    {entry.theme.comment && <blockquote>「{entry.theme.comment}」</blockquote>}
    <div className="tag-list">{entry.theme.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
    {canSendVoice && <QuickVoices onSend={onVoice} />}
    <button className="profile-link" onClick={onProfile}>プロフィール全体を見る <ChevronRight /></button>
  </aside>;
}

const reactions = ['ありがとう！🥳', '助かった！🙌', 'いい視点だった！💡', '頼もしかった！👏', '力が活きてた！✨', 'またお願いしたい！🤝', '新しい一面を知れた！👀'];

function QuickVoices({ onSend }: { onSend: (reaction: string) => void }) {
  return <div className="quick-voices"><strong>ひとこと届ける</strong><div>{reactions.map((reaction) => <button key={reaction} onClick={() => onSend(reaction)}>{reaction}</button>)}</div></div>;
}

function VoiceToast({ name, onUndo }: { name: string; onUndo: () => void }) {
  return <div className="undo-toast">{name}さんに声を届けました！🎉<button onClick={onUndo}><Undo2 />取り消す</button></div>;
}

function MapPageHeading({ view, setView }: { view: 'current' | 'themes'; setView: (view: 'current' | 'themes') => void }) {
  return <><section className="map-page-heading"><div><h1>{view === 'current' ? 'チームの現在地' : 'テーマから見る'}</h1><p>{view === 'current' ? '一人ひとりが置いた現在地から、チーム全体をみわたします。' : 'テーマごとに、経験、本人の感覚、これからの意向をみわたします。'}</p></div><p className="self-report-note">位置は本人が登録しています</p></section><div className="map-view-tabs"><button className={view === 'current' ? 'selected' : ''} onClick={() => setView('current')}>チームの現在地</button><button className={view === 'themes' ? 'selected' : ''} onClick={() => setView('themes')}>テーマから見る</button></div></>;
}

function OverallMap({ members, currentUser, saveMember, navigate, sendVoice }: { members: Member[]; currentUser: Member; saveMember: (member: Member) => void; navigate: (route: Route) => void; sendVoice: (member: Member, reaction: string) => void }) {
  const [selectedId, setSelectedId] = useState<string | null>(currentUser.id);
  const [editing, setEditing] = useState(false);
  const [comment, setComment] = useState(currentUser.overall.comment);
  const selected = members.find((member) => member.id === selectedId);
  const drop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(3, Math.min(97, ((event.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(5, Math.min(95, 100 - ((event.clientY - rect.top) / rect.height) * 100));
    saveMember({ ...currentUser, overall: { ...currentUser.overall, x, y } });
  };
  const saveComment = () => { saveMember({ ...currentUser, overall: { ...currentUser.overall, comment } }); setEditing(false); };
  return <div className="overall-layout"><section className="overall-map"><div className="overall-axis top">まず広げて試す</div><div className="overall-axis bottom">じっくり整える</div><div className="overall-axis left">一人で深める</div><div className="overall-axis right">人と動かす</div><div className="overall-field" onDragOver={(e) => e.preventDefault()} onDrop={drop}>{members.map((member) => <button draggable={member.id === currentUser.id} onDragStart={(e) => e.dataTransfer.setData('text/plain', member.id)} className={`overall-person ${member.id === currentUser.id ? 'is-self' : ''} ${member.id === selectedId ? 'selected' : ''}`} style={{ left: `${member.overall.x}%`, bottom: `${member.overall.y}%` }} key={member.id} onClick={() => setSelectedId(member.id)}><span className="avatar" style={{ background: member.accent }}>{member.initials}</span><strong>{member.name}</strong>{member.id === currentUser.id && <small>自分</small>}</button>)}</div></section>{selected && <aside className="overall-detail"><div className="inspector-person"><span className="avatar" style={{ background: selected.accent }}>{selected.initials}</span><div><h3>{selected.name}</h3><p>{selected.roleLabel}</p></div></div><div className="overall-comment" onDoubleClick={() => selected.id === currentUser.id && setEditing(true)}>{editing ? <><textarea autoFocus value={comment} onChange={(e) => setComment(e.target.value)} onKeyDown={(e) => { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') saveComment(); if (e.key === 'Escape') setEditing(false); }} /><button onClick={saveComment}>保存</button></> : <><p>{selected.overall.comment || 'コメントはまだありません'}</p>{selected.id === currentUser.id && <button onClick={() => setEditing(true)}><Edit3 />編集</button>}</>}</div><div className="related-themes"><strong>この人が登録しているテーマ</strong><div>{selected.themes.slice(0, 5).map((theme) => <span key={theme.name}>{theme.name}</span>)}</div></div>{selected.id !== currentUser.id && <QuickVoices onSend={(reaction) => sendVoice(selected, reaction)} />}<button className="profile-link" onClick={() => navigate({ page: 'member', id: selected.id })}>プロフィールを見る <ChevronRight /></button></aside>}</div>;
}
