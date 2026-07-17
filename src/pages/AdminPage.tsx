import { useState } from 'react';
import { Check, Plus, UserMinus, UserPlus } from 'lucide-react';
import { roleLabel, useStore } from '../store';
import type { Member, Role, ThemeDefinition } from '../types';

export default function AdminPage() {
  const { members, currentUser, saveMember, addMember, themeDefinitions, saveThemeDefinition } = useStore();
  const [adding, setAdding] = useState(false);
  const [notice, setNotice] = useState('');
  const [themeName, setThemeName] = useState('');

  const update = (member: Member, patch: Partial<Member>) => {
    saveMember({ ...member, ...patch });
    setNotice('チーム情報を更新しました');
    window.setTimeout(() => setNotice(''), 1800);
  };

  return (
    <div className="page-wrap admin-page">
      <section className="page-heading">
        <div>
          <h1>管理</h1>
          <p>チームで使うテーマとメンバーを管理します。</p>
        </div>
        {currentUser?.role === 'admin' && <button className="primary-button" onClick={() => setAdding(true)}><UserPlus /> メンバーを追加</button>}
      </section>
      {notice && <div className="notice"><Check />{notice}</div>}

      <section className="theme-admin"><div className="edit-section-heading"><div><h2>仕事のテーマ</h2><p>チームで普段使う動詞を追加し、使わなくなったテーマは利用終了にできます。</p></div><div className="theme-add"><input value={themeName} onChange={(e) => setThemeName(e.target.value)} placeholder="例：試す" /><button className="secondary-button" disabled={!themeName.trim()} onClick={() => { const theme: ThemeDefinition = { id: crypto.randomUUID(), name: themeName.trim(), category: 'その他', description: '', active: true, order: themeDefinitions.length }; saveThemeDefinition(theme); setThemeName(''); }}><Plus />追加</button></div></div><div className="theme-admin-list">{themeDefinitions.map((theme) => <div className={!theme.active ? 'inactive' : ''} key={theme.id}><span><strong>{theme.name}</strong><small>{theme.description || '説明はまだありません'}</small></span><button onClick={() => saveThemeDefinition({ ...theme, active: !theme.active })}>{theme.active ? '利用を終了' : '利用を再開'}</button></div>)}</div></section>

      {currentUser?.role === 'admin' && <section className="member-table-wrap">
        <table className="member-table">
          <thead><tr><th>メンバー</th><th>表示上の役割</th><th>権限</th><th>状態</th><th></th></tr></thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id} className={!member.active ? 'inactive' : ''}>
                <td><div className="table-person"><span className="avatar small" style={{ background: member.accent }}>{member.initials}</span><span><strong>{member.name}</strong><small>{member.email}</small></span></div></td>
                <td><input value={member.roleLabel} onChange={(event) => update(member, { roleLabel: event.target.value })} /></td>
                <td><select value={member.role} onChange={(event) => update(member, { role: event.target.value as Role })}><option value="member">メンバー</option><option value="assigner">アサイン検討者</option><option value="admin">管理者</option></select></td>
                <td><span className={`status ${member.active ? '' : 'off'}`}>{member.active ? '在籍中' : 'チーム外'}</span></td>
                <td><button className="row-action" onClick={() => update(member, { active: !member.active })}>{member.active ? <><UserMinus />チームから外す</> : <><Plus />チームに戻す</>}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>}

      {adding && <MemberModal onClose={() => setAdding(false)} onAdd={(member) => { addMember(member); setAdding(false); }} />}
    </div>
  );
}

function MemberModal({ onClose, onAdd }: { onClose: () => void; onAdd: (member: Member) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [roleLabelText, setRoleLabelText] = useState('デザイナー');
  const [role, setRole] = useState<Role>('member');
  const submit = () => onAdd({
    id: crypto.randomUUID(), name, email, roleLabel: roleLabelText, role,
    initials: name.slice(0, 1), updatedAt: new Date().toISOString().slice(0, 10),
    accent: '#60758F', direction: 'これから本人が登録します', overall: { x: 50, y: 50, comment: '' }, themes: [], voices: [], active: true,
  });
  return <div className="modal-backdrop" onMouseDown={onClose}><div className="modal" onMouseDown={(event) => event.stopPropagation()}><h2>メンバーを追加</h2><p>所属情報だけを登録します。経験や意向は本人が登録します。</p><label className="form-field"><span>氏名</span><input autoFocus value={name} onChange={(event) => setName(event.target.value)} /></label><label className="form-field"><span>メールアドレス</span><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label><label className="form-field"><span>表示上の役割</span><input value={roleLabelText} onChange={(event) => setRoleLabelText(event.target.value)} /></label><label className="form-field"><span>権限</span><select value={role} onChange={(event) => setRole(event.target.value as Role)}><option value="member">{roleLabel('member')}</option><option value="assigner">{roleLabel('assigner')}</option><option value="admin">{roleLabel('admin')}</option></select></label><div className="modal-actions"><button className="text-button" onClick={onClose}>キャンセル</button><button className="primary-button" disabled={!name.trim() || !email.trim()} onClick={submit}>追加する</button></div></div></div>;
}
