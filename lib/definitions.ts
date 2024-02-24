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

export enum ProfileFormStage {
  포지션 = '포지션',
  기술 = '기술',
  학력 = '학력',
  연락처 = '연락처',
  한줄소개 = '한줄소개',
}

export const ProfileFormStages = [
  ProfileFormStage.포지션,
  ProfileFormStage.기술,
  ProfileFormStage.학력,
  ProfileFormStage.연락처,
  ProfileFormStage.한줄소개,
];

export const IntroductionKeywords = [
  '책임감을 갖고 일해요.',
  '원활한 소통이 가능해요.',
  '주도적으로 일할 수 있어요.',
  '유연한 업무가 가능해요.',
  '성장을 추구하는 사람이에요.',
  '팀워크를 중요하게 생각해요.',
  '새로운 것을 배우는 것을 좋아해요.',
  '문제 해결 능력이 뛰어나요.',
  '자율적으로 일할 수 있어요.',
  '신뢰할 수 있는 사람이에요.',
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
  profileImage?: string;
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
  | 'profileImage'
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
