export interface User {
  id: string;
  email?: string;
  password?: string;
  name: string;
  profileImageUrl?: string;
  isStartup?: boolean;
}

export interface ArrayItemQueryRows {
  name: string;
}

export enum Position {
  프론트엔드 = '프론트엔드',
  백엔드 = '백엔드',
  풀스택 = '풀스택',
  DevOps = 'DevOps',
  iOS = 'iOS',
  Android = 'Android',
  인공지능머신러닝 = '인공지능 • 머신러닝',
  데이터엔지니어 = '데이터 엔지니어',
  게임서버 = '게임 서버',
  게임클라이언트 = '게임 클라이언트',
  VRAR = 'VR/AR/MR/XR',
  소프트웨어엔지니어 = '소프트웨어 엔지니어',
  크로스플랫폼앱 = '크로스플랫폼 앱',
}

export const PositionList = Object.values(Position);

export enum GraduateStatus {
  재학 = 'AT',
  휴학 = 'AB',
  졸업 = 'GR',
  졸업예정 = 'GS',
  중퇴 = 'DO',
  수료 = 'CC',
}

export const GraduateStatusOptions = [
  { value: GraduateStatus.재학, label: '재학' },
  { value: GraduateStatus.휴학, label: '휴학' },
  { value: GraduateStatus.졸업, label: '졸업' },
  { value: GraduateStatus.졸업예정, label: '졸업예정' },
  { value: GraduateStatus.중퇴, label: '중퇴' },
  { value: GraduateStatus.수료, label: '수료' },
];

export enum ContractPreference {
  풀타임 = 'FULL_TIME',
  파트타임 = 'PART_TIME',
  외주 = 'FREELANCE',
  인턴 = 'INTERNSHIP',
}

export const ContractPreferenceOptions = [
  { value: ContractPreference.풀타임, label: '풀타임' },
  { value: ContractPreference.파트타임, label: '파트타임' },
  { value: ContractPreference.외주, label: '외주' },
  { value: ContractPreference.인턴, label: '인턴' },
];

export const ContractPreferenceLabels = {
  [ContractPreference.풀타임]: '풀타임',
  [ContractPreference.파트타임]: '파트타임',
  [ContractPreference.외주]: '외주',
  [ContractPreference.인턴]: '인턴',
};

export enum ProfileFormStage {
  포지션 = 'positions',
  기술 = 'skills',
  학력 = 'school',
  연락처 = 'contact',
  한줄소개 = 'shortBio',
}

export enum ProfileEditParams {
  기본정보 = 'basic',
  간단소개 = 'shortBio',
  자기소개 = 'personalStatement',
  포지션기술 = 'positions-and-skills',
  경력 = 'experiences',
}

export const ProfileFormStages = [
  ProfileFormStage.포지션,
  ProfileFormStage.기술,
  ProfileFormStage.학력,
  ProfileFormStage.연락처,
  ProfileFormStage.한줄소개,
];

export const IntroductionKeywords = [
  '🧑‍💼 책임감을 갖고 일해요.',
  '💬 원활한 소통이 가능해요.',
  '👑 주도적으로 일할 수 있어요.',
  '🦑 유연한 업무가 가능해요.',
  '📈 성장을 추구하는 사람이에요.',
  '🧑‍🤝‍🧑 팀워크를 중요하게 생각해요.',
  '🕵️ 새로운 것을 배우는 것을 좋아해요.',
  '🧚‍♀️ 문제 해결 능력이 뛰어나요.',
  '🙋 자율적으로 일할 수 있어요.',
  '😊 신뢰할 수 있는 사람이에요.',
];

export interface ProfileTextData extends Record<string, string | undefined> {
  personalStatement?: string;
  mainStrength?: string;
  shortBio?: string;
}

export interface Profile {
  id: number;
  userId: string;
  name: string;
  phoneNumber: string;
  email: string;
  dateOfBirth?: Date;
  address?: string;
  profileImageUrl?: string;
  positions?: string[];
  skills?: string[];
  school?: string;
  major?: string;
  graduateStatus?: string;
  personalStatement?: string;
  mainStrength?: string;
  shortBio?: string;
  githubLink?: string;
  webLink?: string;
  attachedFiles?: string[];
  isActivelySeeking: boolean;
  introductionKeywords?: string[];
  contractPreference?: ContractPreference[];
}

export interface ProfileFormData {
  name: string;
  phoneNumber: string;
  email: string;
  positions?: string[];
  skills?: string[];
  school?: string;
  major?: string;
  graduateStatus?: string;
  shortBio?: string;
  introductionKeywords?: string[];
}

export type ProfileUpdateFormData = Omit<
  Profile,
  | 'id'
  | 'userId'
  | 'profileImageUrl'
  | 'attachedFiles'
  | 'personalStatement'
  | 'mainStrength'
  | 'shortBio'
  | 'positions'
  | 'skills'
  | 'isActivelySeeking'
  | 'introductionKeywords'
>;

export type ProfilePositionAndSkillsUpdateFormData = Pick<
  Profile,
  'positions' | 'skills'
>;

export type ProfileShortIntroUpdateFormData = Pick<
  Profile,
  'shortBio' | 'introductionKeywords'
>;

export interface Experience {
  id: number;
  userId: string;
  companyName: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  isWorkingNow: boolean;
  skills?: string[];
  description?: string;
}

export type ExperienceFormData = Omit<Experience, 'id' | 'userId'>;

export type ExperienceUpdateFormData = Omit<Experience, 'userId'>;

export interface AttachmentFiles {
  id: number;
  fileName: string;
  mediaLink: string;
}
