export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
}

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
  dateOfBirth?: string;
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
