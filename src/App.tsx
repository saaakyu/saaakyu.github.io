import { useState } from 'react';
import { LogOut, Map, RotateCcw, Settings, UserRound } from 'lucide-react';
import { useStore } from './store';
import AdminPage from './pages/AdminPage';
import DetailPage from './pages/DetailPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import TeamMapPage from './pages/TeamMapPage';

export type Route =
  | { page: 'map'; skill?: string }
  | { page: 'member'; id: string }
  | { page: 'profile' }
  | { page: 'admin' };

export default function App() {
  const { currentUser, logout, reset } = useStore();
  const [route, setRoute] = useState<Route>({ page: 'map' });
  const [accountOpen, setAccountOpen] = useState(false);

  if (!currentUser) return <LoginPage />;

  const navigate = (next: Route) => {
    setRoute(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <button className="brand" onClick={() => navigate({ page: 'map' })}>
          <span className="brand-mark">M</span>
          <span>Miwatashi</span>
        </button>

        <nav aria-label="メインメニュー">
          <button
            className={route.page === 'map' || route.page === 'member' ? 'active' : ''}
            onClick={() => navigate({ page: 'map' })}
          >
            <Map /> チームマップ
          </button>
          <button
            className={route.page === 'profile' ? 'active' : ''}
            onClick={() => navigate({ page: 'profile' })}
          >
            <UserRound /> 自分のプロフィール
          </button>
          {currentUser.role === 'admin' && (
            <button
              className={route.page === 'admin' ? 'active' : ''}
              onClick={() => navigate({ page: 'admin' })}
            >
              <Settings /> チーム管理
            </button>
          )}
        </nav>

        <div className="account">
          <button className="account-button" onClick={() => setAccountOpen(!accountOpen)}>
            <span className="avatar small" style={{ background: currentUser.accent }}>
              {currentUser.initials}
            </span>
            <span>{currentUser.name}</span>
          </button>
          {accountOpen && (
            <div className="account-menu">
              <p>{currentUser.email}</p>
              <button onClick={() => { navigate({ page: 'profile' }); setAccountOpen(false); }}>
                <UserRound /> プロフィールを編集
              </button>
              <button onClick={logout}><LogOut /> ログアウト</button>
              <button className="muted-action" onClick={reset}>
                <RotateCcw /> デモデータをリセット
              </button>
            </div>
          )}
        </div>
      </header>

      <main>
        {route.page === 'map' && (
          <TeamMapPage initialSkill={route.skill} navigate={navigate} />
        )}
        {route.page === 'member' && <DetailPage id={route.id} navigate={navigate} />}
        {route.page === 'profile' && <ProfilePage navigate={navigate} />}
        {route.page === 'admin' && <AdminPage />}
      </main>
    </div>
  );
}
