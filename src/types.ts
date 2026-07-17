export type Role = 'member' | 'assigner' | 'admin';
export type Visibility = 'team' | 'assigner' | 'private';
export type ExperienceLevel = 1 | 2 | 3 | 4 | 5;
export type ComfortLevel = 1 | 2 | 3 | 4;
export type ThemeIntent =
  | '活かしたい'
  | '挑戦したい'
  | '支援があれば挑戦したい'
  | '機会があれば'
  | '今は減らしたい'
  | '今は避けたい'
  | '今後も優先したくない'
  | 'まだ分からない';

export interface ThemeEntry {
  name: string;
  category: string;
  experience: ExperienceLevel;
  comfort: ComfortLevel;
  intent: ThemeIntent;
  comment: string;
  tags: string[];
  visibility: Visibility;
}

export interface ExperienceVoice {
  id: string;
  theme: string;
  kind: string;
  event: string;
  message: string;
  fromId: string;
  fromName: string;
  date: string;
  read: boolean;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  initials: string;
  roleLabel: string;
  role: Role;
  updatedAt: string;
  accent: string;
  direction: string;
  themes: ThemeEntry[];
  voices: ExperienceVoice[];
  active: boolean;
}

export interface ThemeDefinition {
  name: string;
  category: string;
  description: string;
}
