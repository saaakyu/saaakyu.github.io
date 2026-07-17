import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { seedMembers } from './data';
import type { Member } from './types';

interface StoreValue {
  members: Member[];
  currentUser: Member | null;
  login: (memberId: string) => void;
  logout: () => void;
  saveMember: (member: Member) => void;
  addMember: (member: Member) => void;
  reset: () => void;
}

const STORAGE_KEY = 'talkship-team-map-v2';
const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [members, setMembers] = useState<Member[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved).members : seedMembers;
    } catch {
      return seedMembers;
    }
  });
  const [currentUserId, setCurrentUserId] = useState<string | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved).currentUserId : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ members, currentUserId }));
  }, [members, currentUserId]);

  const value = useMemo<StoreValue>(() => ({
    members,
    currentUser: members.find((member) => member.id === currentUserId) ?? null,
    login: setCurrentUserId,
    logout: () => setCurrentUserId(null),
    saveMember: (updated) => setMembers((list) =>
      list.map((member) => member.id === updated.id ? updated : member)),
    addMember: (member) => setMembers((list) => [...list, member]),
    reset: () => {
      setMembers(seedMembers);
      setCurrentUserId(null);
    },
  }), [members, currentUserId]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error('StoreProvider is missing');
  return value;
}

export const roleLabel = (role: Member['role']) => ({
  member: 'メンバー',
  assigner: 'アサイン検討者',
  admin: '管理者',
}[role]);
