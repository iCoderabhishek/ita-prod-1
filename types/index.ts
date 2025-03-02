export enum Label {
  EXAM = 'EXAM',
  ADMISSION = 'ADMISSION',
  FACULTY = 'FACULTY',
  STUDENTS = 'STUDENTS',
  SPORTS = 'SPORTS',
  COLLEGE = 'COLLEGE'
}

export interface Notice {
  id: string;
  title: string;
  description: string;
  label: Label;
  fullNoticeLink: string;
  createdAt: string;
}

export interface Admin {
  id: string;
  clerkId: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Analytics {
  id: string;
  month: string;
  userVisits: number;
  updatedAt: string;
}