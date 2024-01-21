export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
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
  수료 = 'CC'
}

export const GraduateStatusOptions = [
  { value: GraduateStatus.재학, label: '재학' },
  { value: GraduateStatus.휴학, label: '휴학' },
  { value: GraduateStatus.졸업, label: '졸업' },
  { value: GraduateStatus.졸업예정, label: '졸업예정' },
  { value: GraduateStatus.중퇴, label: '중퇴' },
  { value: GraduateStatus.수료, label: '수료' }
];

export interface ProfileTextData extends Record<string, string | undefined> {
  personalStatement?: string;
  mainStrength?: string;
  expectationText?: string;
}

export interface Profile {
  id: number;
  userId: string;
  name: string;
  phoneNumber: string;
  email: string;
  dateOfBirth?: Date;
  sex?: string;
  address?: string;
  profileImage?: string;
  positions?: string[];
  skills?: string[];
  school?: string;
  major?: string;
  graduateStatus?: string;
  personalStatement?: string;
  mainStrength?: string;
  expectationText?: string;
  githubLink?: string;
  webLink?: string;
  attachedFiles?: string[];
}

export interface ProfileFormData {
  phoneNumber: string;
  dateOfBirth?: string;
  address?: string;
  positions?: string[];
  skills?: string[];
  school?: string;
  major?: string;
  graduateStatus?: string;
  githubLink?: string;
}

export type ProfileUpdateFormData = Omit<
  Profile,
  'personalStatement' | 'mainStrength' | 'expectationText'
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
