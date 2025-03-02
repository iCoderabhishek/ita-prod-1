import { Notice, Label } from '../types';

// This is a mock API service for demonstration purposes
// In a real application, this would interact with the Prisma client

const mockNotices: Notice[] = [
  {
    id: '1',
    title: 'Final Exam Schedule Released',
    description: 'The schedule for final examinations has been released. Please check the link for details.',
    label: Label.EXAM,
    fullNoticeLink: 'https://drive.google.com/file/example1',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Admission Open for 2025-26 Academic Year',
    description: 'Applications are now being accepted for the upcoming academic year. Last date to apply is December 15, 2025.',
    label: Label.ADMISSION,
    fullNoticeLink: 'https://drive.google.com/file/example2',
    createdAt: new Date(Date.now() - 86400000).toISOString() // Yesterday
  },
  {
    id: '3',
    title: 'Faculty Meeting Announcement',
    description: 'All faculty members are requested to attend the general meeting on Friday at 3 PM.',
    label: Label.FACULTY,
    fullNoticeLink: 'https://drive.google.com/file/example3',
    createdAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
  },
  {
    id: '4',
    title: 'Annual Sports Day Registration',
    description: 'Registration for Annual Sports Day events is now open. Last date to register is November 10, 2025.',
    label: Label.SPORTS,
    fullNoticeLink: 'https://drive.google.com/file/example4',
    createdAt: new Date(Date.now() - 259200000).toISOString() // 3 days ago
  }
];

export const getNotices = async (): Promise<Notice[]> => {
  // In a real application, this would be:
  // return await prisma.notice.findMany({
  //   orderBy: { createdAt: 'desc' }
  // });
  
  return mockNotices;
};

export const createNotice = async (noticeData: Omit<Notice, 'id' | 'createdAt'>): Promise<Notice> => {
  // In a real application, this would be:
  // return await prisma.notice.create({
  //   data: noticeData
  // });
  
  const newNotice: Notice = {
    id: Date.now().toString(),
    ...noticeData,
    createdAt: new Date().toISOString()
  };
  
  mockNotices.unshift(newNotice);
  return newNotice;
};

export const getNoticeById = async (id: string): Promise<Notice | null> => {
  // In a real application, this would be:
  // return await prisma.notice.findUnique({
  //   where: { id }
  // });
  
  return mockNotices.find(notice => notice.id === id) || null;
};

export const updateNotice = async (id: string, noticeData: Partial<Omit<Notice, 'id' | 'createdAt'>>): Promise<Notice | null> => {
  // In a real application, this would be:
  // return await prisma.notice.update({
  //   where: { id },
  //   data: noticeData
  // });
  
  const noticeIndex = mockNotices.findIndex(notice => notice.id === id);
  if (noticeIndex === -1) return null;
  
  const updatedNotice = {
    ...mockNotices[noticeIndex],
    ...noticeData
  };
  
  mockNotices[noticeIndex] = updatedNotice;
  return updatedNotice;
};

export const deleteNotice = async (id: string): Promise<boolean> => {
  // In a real application, this would be:
  // await prisma.notice.delete({
  //   where: { id }
  // });
  // return true;
  
  const noticeIndex = mockNotices.findIndex(notice => notice.id === id);
  if (noticeIndex === -1) return false;
  
  mockNotices.splice(noticeIndex, 1);
  return true;
};