export type Role = 'member' | 'assigner' | 'admin';

export type Capacity =
  | '余裕あり'
  | '少し余裕あり'
  | 'ほぼ埋まっている'
  | '新しい仕事は難しい';

export type Visibility = 'team' | 'assigner' | 'private';

export type ExperienceLevel = 1 | 2 | 3 | 4 | 5;

export type SkillIntent =
  | '活かしたい'
  | '機会があれば'
  | '挑戦したい'
  | '支援があれば'
  | '今は減らしたい'
  | '今は避けたい';

export interface SkillEntry {
  name: string;
  category: string;
  level: ExperienceLevel;
  intent: SkillIntent;
  comment: string;
  visibility: Visibility;
}

export interface Feedback {
  id: string;
  skill: string;
  message: string;
  from: string;
  date: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  initials: string;
  roleLabel: string;
  role: Role;
  capacity: Capacity;
  updatedAt: string;
  accent: string;
  direction: string;
  skills: SkillEntry[];
  feedback: Feedback[];
  active: boolean;
}
