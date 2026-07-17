import { ArrowRight, Lock } from 'lucide-react';
import { useStore } from '../store';

export default function LoginPage() {
  const { members, login } = useStore();
  const activeMembers = members.filter((member) => member.active);

  return (
    <main className="login-page">
      <section className="login-intro">
        <div className="login-brand"><span className="brand-mark">M</span> チームマップ</div>
        <div>
          <h1>チームの「できる」と<br />「やりたい」を一緒に見る。</h1>
          <p>
            アサインに迷ったとき、経験だけでなく、次に挑戦したいことや
            今は減らしたいことも思い出すためのチームマップです。
          </p>
        </div>
        <p className="purpose-note">
          人事評価や査定には使用しません。アサイン検討と本人との対話を支援します。
        </p>
      </section>

      <section className="login-panel">
        <div className="login-box">
          <span className="login-icon"><Lock /></span>
          <h2>デモにログイン</h2>
          <p>確認したい役割のアカウントを選んでください。</p>
          <div className="account-list">
            {activeMembers.map((member) => (
              <button key={member.id} onClick={() => login(member.id)}>
                <span className="avatar" style={{ background: member.accent }}>
                  {member.initials}
                </span>
                <span>
                  <strong>{member.name}</strong>
                  <small>{member.roleLabel}</small>
                </span>
                <ArrowRight />
              </button>
            ))}
          </div>
          <p className="demo-help">パスワードは不要です。入力内容はこのブラウザ内に保存されます。</p>
        </div>
      </section>
    </main>
  );
}
