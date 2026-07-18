/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { seedMembers, themeDefinitions } from './data';
import type { ExperienceVoice, Member, ThemeDefinition } from './types';

interface StoreValue {
  members: Member[];
  themeDefinitions: ThemeDefinition[];
  currentUser: Member | null;
  login: (memberId: string) => void;
  logout: () => void;
  saveMember: (member: Member) => void;
  addMember: (member: Member) => void;
  sendVoice: (memberId: string, voice: ExperienceVoice) => void;
  markVoiceRead: (memberId: string, voiceId: string) => void;
  removeVoice: (memberId: string, voiceId: string) => void;
  saveThemeDefinition: (theme: ThemeDefinition) => void;
  reset: () => void;
}

const STORAGE_KEY = 'miwatashi-v3';
const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [members, setMembers] = useState<Member[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return seedMembers;
      return JSON.parse(saved).members.map((member: Member) => ({
        ...member,
        headerColor: member.headerColor ?? '#e8edff',
        bio: member.bio ?? 'これから本人が自己紹介を登録します。',
        interests: member.interests ?? '',
      }));
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
  const [themes, setThemes] = useState<ThemeDefinition[]>(() => {
    try { const saved = localStorage.getItem(STORAGE_KEY); return saved ? JSON.parse(saved).themes ?? themeDefinitions : themeDefinitions; }
    catch { return themeDefinitions; }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ members, currentUserId, themes }));
  }, [members, currentUserId, themes]);

  const value = useMemo<StoreValue>(() => ({
    members,
    themeDefinitions: themes,
    currentUser: members.find((member) => member.id === currentUserId) ?? null,
    login: setCurrentUserId,
    logout: () => setCurrentUserId(null),
    saveMember: (updated) => setMembers((list) =>
      list.map((member) => member.id === updated.id ? updated : member)),
    addMember: (member) => setMembers((list) => [...list, member]),
    sendVoice: (memberId, voice) => setMembers((list) => list.map((member) =>
      member.id === memberId ? { ...member, voices: [...member.voices, voice] } : member)),
    markVoiceRead: (memberId, voiceId) => setMembers((list) => list.map((member) =>
      member.id === memberId
        ? { ...member, voices: member.voices.map((voice) => voice.id === voiceId ? { ...voice, read: true } : voice) }
        : member)),
    removeVoice: (memberId, voiceId) => setMembers((list) => list.map((member) =>
      member.id === memberId ? { ...member, voices: member.voices.filter((voice) => voice.id !== voiceId) } : member)),
    saveThemeDefinition: (theme) => setThemes((list) => [...list.filter((item) => item.id !== theme.id), theme].sort((a, b) => a.order - b.order)),
    reset: () => {
      setMembers(seedMembers);
      setCurrentUserId(null);
      setThemes(themeDefinitions);
    },
  }), [members, currentUserId, themes]);

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
