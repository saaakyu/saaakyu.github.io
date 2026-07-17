import { useState } from 'react';
import { Check, Mail, Plus, Save, Trash2 } from 'lucide-react';
import type { Route } from '../App';
import { themeDefinitions } from '../data';
import { useStore } from '../store';
import type { ComfortLevel, ExperienceLevel, ThemeEntry, ThemeIntent, Visibility } from '../types';

const experienceOptions = ['まだ経験がない', '少し経験した', '複数回経験した', '継続的に経験している', '他の人を支援できる'];
const comfortOptions = ['苦手意識がある', '少し不安がある', '比較的取り組みやすい', '自然に取り組める'];
const intents: ThemeIntent[] = ['活かしたい', '挑戦したい', '支援があれば挑戦したい', '機会があれば', '今は減らしたい', '今は避けたい', '今後も優先したくない', 'まだ分からない'];

export default function ProfilePage({ navigate }: { navigate: (route: Route) => void }) {
  const { currentUser, saveMember, markVoiceRead } = useStore();
  const [form, setForm] = useState(currentUser!);
  const [adding, setAdding] = useState(false);
  const [saved, setSaved] = useState(false);
  if (!currentUser) return null;

  const updateTheme = (index: number, patch: Partial<ThemeEntry>) => setForm({
    ...form,
    themes: form.themes.map((theme, i) => i === index ? { ...theme, ...patch } : theme),
  });
  const save = () => {
    saveMember({ ...form, updatedAt: new Date().toISOString().slice(0, 10) });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };

  return <div className="page-wrap profile-edit">
    <section className="page-heading"><div><h1>自分のプロフィール</h1><p>自分の現在地と、これからの意向を更新します。</p></div>{saved && <span className="saved-message"><Check />保存しました</span>}</section>

    {currentUser.voices.length > 0 && <section className="voice-inbox">
      <div className="voice-inbox-heading"><Mail /><div><h2>届いた経験の声</h2><p>周囲が気付いた、具体的な仕事の場面です。</p></div></div>
      {currentUser.voices.map((voice) => <article className={voice.read ? '' : 'unread'} key={voice.id}>
        <div><span>{voice.theme}</span><strong>{voice.kind}</strong><blockquote>「{voice.event}」</blockquote>{voice.message && <p>{voice.message}</p>}<small>{voice.fromName}さん・{new Date(voice.date).toLocaleDateString('ja-JP')}</small></div>
        <div className="voice-actions"><button onClick={() => navigate({ page: 'map', skill: voice.theme })}>マップで確認する</button>{!voice.read && <button onClick={() => markVoiceRead(currentUser.id, voice.id)}>確認しました</button>}</div>
      </article>)}
    </section>}

    <section className="edit-section"><h2>これから大切にしたいこと</h2><label className="form-field"><span>短い言葉で書いてください</span><textarea value={form.direction} onChange={(event) => setForm({ ...form, direction: event.target.value })} /></label></section>

    <section className="edit-section">
      <div className="edit-section-heading"><div><h2>仕事のテーマ</h2><p>経験、本人の感覚、これからの意向をテーマごとに登録します。</p></div><button className="secondary-button" onClick={() => setAdding(true)}><Plus />テーマを追加</button></div>
      <div className="skill-edit-list">{form.themes.map((theme, index) => <article key={theme.name}>
        <div className="skill-edit-heading"><div><span>{theme.category}</span><h3>{theme.name}</h3></div><button aria-label={`${theme.name}を削除`} onClick={() => setForm({ ...form, themes: form.themes.filter((_, i) => i !== index) })}><Trash2 /></button></div>
        <div className="form-row"><label className="form-field"><span>経験の積み重ね</span><select value={theme.experience} onChange={(e) => updateTheme(index, { experience: Number(e.target.value) as ExperienceLevel })}>{experienceOptions.map((label, i) => <option value={i + 1} key={label}>{label}</option>)}</select></label><label className="form-field"><span>本人の感覚</span><select value={theme.comfort} onChange={(e) => updateTheme(index, { comfort: Number(e.target.value) as ComfortLevel })}>{comfortOptions.map((label, i) => <option value={i + 1} key={label}>{label}</option>)}</select></label></div>
        <label className="form-field"><span>これからの意向</span><select value={theme.intent} onChange={(e) => updateTheme(index, { intent: e.target.value as ThemeIntent })}>{intents.map((intent) => <option key={intent}>{intent}</option>)}</select></label>
        <label className="form-field"><span>自分の言葉で補足</span><textarea value={theme.comment} onChange={(e) => updateTheme(index, { comment: e.target.value })} /></label>
        <label className="form-field"><span>経験タグ（読点で区切る）</span><input value={theme.tags.join('、')} onChange={(e) => updateTheme(index, { tags: e.target.value.split(/[、,]/).map((tag) => tag.trim()).filter(Boolean) })} /></label>
        <label className="form-field visibility-field"><span>公開範囲</span><select value={theme.visibility} onChange={(e) => updateTheme(index, { visibility: e.target.value as Visibility })}><option value="team">チームに共有</option><option value="assigner">アサイン検討者だけ</option><option value="private">自分だけ</option></select></label>
      </article>)}</div>
    </section>
    <div className="save-bar"><button className="text-button" onClick={() => navigate({ page: 'member', id: currentUser.id })}>表示を確認</button><button className="primary-button" onClick={save}><Save />変更を保存</button></div>
    {adding && <ThemeModal existing={form.themes.map((theme) => theme.name)} onClose={() => setAdding(false)} onAdd={(theme) => { setForm({ ...form, themes: [...form.themes, theme] }); setAdding(false); }} />}
  </div>;
}

function ThemeModal({ existing, onClose, onAdd }: { existing: string[]; onClose: () => void; onAdd: (theme: ThemeEntry) => void }) {
  const available = themeDefinitions.filter((theme) => !existing.includes(theme.name));
  const [name, setName] = useState(available[0]?.name ?? '');
  const definition = themeDefinitions.find((theme) => theme.name === name);
  const submit = () => definition && onAdd({ name, category: definition.category, experience: 1, comfort: 2, intent: 'まだ分からない', comment: '', tags: [], visibility: 'team' });
  return <div className="modal-backdrop" onMouseDown={onClose}><div className="modal" onMouseDown={(e) => e.stopPropagation()}><h2>テーマを追加</h2><p>まだ登録していない仕事のテーマから選びます。</p><label className="form-field"><span>仕事のテーマ</span><select value={name} onChange={(e) => setName(e.target.value)}>{available.map((theme) => <option key={theme.name}>{theme.name}</option>)}</select></label>{definition && <p className="theme-description">{definition.description}</p>}<div className="modal-actions"><button className="text-button" onClick={onClose}>キャンセル</button><button className="primary-button" disabled={!name} onClick={submit}>追加する</button></div></div></div>;
}
