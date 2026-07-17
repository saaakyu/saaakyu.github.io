import { useState } from 'react';
import { Check, Plus, Save, Trash2 } from 'lucide-react';
import type { Route } from '../App';
import { useStore } from '../store';
import type { Capacity, ExperienceLevel, SkillEntry, SkillIntent, Visibility } from '../types';

const capacities: Capacity[] = ['余裕あり', '少し余裕あり', 'ほぼ埋まっている', '新しい仕事は難しい'];
const intents: SkillIntent[] = ['活かしたい', '機会があれば', '挑戦したい', '支援があれば', '今は減らしたい', '今は避けたい'];
const levels: { value: ExperienceLevel; label: string }[] = [
  { value: 1, label: '学んでいる途中' },
  { value: 2, label: 'サポートがあれば取り組める' },
  { value: 3, label: '一人で対応できる' },
  { value: 4, label: '支援・レビューできる' },
  { value: 5, label: '進め方やルールを設計できる' },
];

const emptySkill: SkillEntry = {
  name: '', category: 'プロダクト', level: 1, intent: '挑戦したい', comment: '', visibility: 'team',
};

export default function ProfilePage({ navigate }: { navigate: (route: Route) => void }) {
  const { currentUser, saveMember } = useStore();
  const [form, setForm] = useState(currentUser!);
  const [saved, setSaved] = useState(false);
  const [adding, setAdding] = useState(false);

  if (!currentUser) return null;

  const updateSkill = (index: number, patch: Partial<SkillEntry>) => {
    const skills = form.skills.map((entry, entryIndex) => entryIndex === index ? { ...entry, ...patch } : entry);
    setForm({ ...form, skills });
  };

  const save = () => {
    saveMember({ ...form, updatedAt: new Date().toISOString().slice(0, 10) });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2400);
  };

  return (
    <div className="page-wrap profile-edit">
      <section className="page-heading">
        <div>
          <h1>自分のプロフィール</h1>
          <p>経験や意向が変わったところだけ更新してください。</p>
        </div>
        {saved && <span className="saved-message"><Check /> 保存しました</span>}
      </section>

      <section className="edit-section">
        <h2>今の状況</h2>
        <label className="field-label">現在の余力</label>
        <div className="choice-buttons">
          {capacities.map((capacity) => (
            <button
              className={form.capacity === capacity ? 'selected' : ''}
              key={capacity}
              onClick={() => setForm({ ...form, capacity })}
            >
              {form.capacity === capacity && <Check />}{capacity}
            </button>
          ))}
        </div>
        <label className="form-field">
          <span>これから大切にしたいこと</span>
          <textarea value={form.direction} onChange={(event) => setForm({ ...form, direction: event.target.value })} />
        </label>
      </section>

      <section className="edit-section">
        <div className="edit-section-heading">
          <div><h2>経験とこれからの意向</h2><p>スキルごとに、今後どのように関わりたいかを登録します。</p></div>
          <button className="secondary-button" onClick={() => setAdding(true)}><Plus /> スキルを追加</button>
        </div>
        <div className="skill-edit-list">
          {form.skills.map((entry, index) => (
            <article key={`${entry.name}-${index}`}>
              <div className="skill-edit-heading">
                <div><span>{entry.category}</span><h3>{entry.name}</h3></div>
                <button aria-label={`${entry.name}を削除`} onClick={() => setForm({ ...form, skills: form.skills.filter((_, i) => i !== index) })}><Trash2 /></button>
              </div>
              <div className="form-row">
                <label className="form-field">
                  <span>経験の目安</span>
                  <select value={entry.level} onChange={(event) => updateSkill(index, { level: Number(event.target.value) as ExperienceLevel })}>
                    {levels.map((level) => <option value={level.value} key={level.value}>{level.label}</option>)}
                  </select>
                </label>
                <label className="form-field">
                  <span>これからの意向</span>
                  <select value={entry.intent} onChange={(event) => updateSkill(index, { intent: event.target.value as SkillIntent })}>
                    {intents.map((intent) => <option key={intent}>{intent}</option>)}
                  </select>
                </label>
              </div>
              <label className="form-field">
                <span>自分の言葉で補足</span>
                <textarea value={entry.comment} onChange={(event) => updateSkill(index, { comment: event.target.value })} />
              </label>
              <label className="form-field visibility-field">
                <span>公開範囲</span>
                <select value={entry.visibility} onChange={(event) => updateSkill(index, { visibility: event.target.value as Visibility })}>
                  <option value="team">チームに共有</option>
                  <option value="assigner">アサイン検討者だけに共有</option>
                  <option value="private">自分だけ</option>
                </select>
              </label>
            </article>
          ))}
        </div>
      </section>

      <div className="save-bar">
        <button className="text-button" onClick={() => navigate({ page: 'member', id: currentUser.id })}>表示を確認</button>
        <button className="primary-button" onClick={save}><Save /> 変更を保存</button>
      </div>

      {adding && (
        <SkillModal
          onClose={() => setAdding(false)}
          onAdd={(entry) => { setForm({ ...form, skills: [...form.skills, entry] }); setAdding(false); }}
        />
      )}
    </div>
  );
}

function SkillModal({ onClose, onAdd }: { onClose: () => void; onAdd: (entry: SkillEntry) => void }) {
  const [entry, setEntry] = useState(emptySkill);
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(event) => event.stopPropagation()}>
        <h2>スキルを追加</h2>
        <label className="form-field"><span>スキル名</span><input autoFocus value={entry.name} onChange={(e) => setEntry({ ...entry, name: e.target.value })} /></label>
        <label className="form-field"><span>カテゴリー</span><select value={entry.category} onChange={(e) => setEntry({ ...entry, category: e.target.value })}><option>プロダクト</option><option>コミュニケーション</option><option>ブランド・制作</option><option>進行・仕組み</option></select></label>
        <label className="form-field"><span>これからの意向</span><select value={entry.intent} onChange={(e) => setEntry({ ...entry, intent: e.target.value as SkillIntent })}>{intents.map((intent) => <option key={intent}>{intent}</option>)}</select></label>
        <label className="form-field"><span>自分の言葉で補足</span><textarea value={entry.comment} onChange={(e) => setEntry({ ...entry, comment: e.target.value })} /></label>
        <div className="modal-actions"><button className="text-button" onClick={onClose}>キャンセル</button><button className="primary-button" disabled={!entry.name.trim()} onClick={() => onAdd(entry)}>追加する</button></div>
      </div>
    </div>
  );
}
