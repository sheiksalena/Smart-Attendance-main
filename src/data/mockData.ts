import { User, AttendanceRecord } from '../types';

export const mockUsers: User[] = [
  {
    ID_No: 101,
    Name: 'Muhab',
    Email: 'sheik@example.com',
    Image_Link: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    DOB: '2006-04-09'
  },
  {
    ID_No: 102,
    Name: 'Salena',
    Email: 'salena@example.com',
    Image_Link: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    DOB: '2004-08-04'
  },
  {
    ID_No: 103,
    Name: 'Misbah',
    Email: 'misbah@example.com',
    Image_Link: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    DOB: '2005-04-14'
  },
  {
    ID_No: 104,
    Name: 'Ahmed',
    Email: 'ahmed@example.com',
    Image_Link: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    DOB: '2005-12-15'
  },
  {
    ID_No: 105,
    Name: 'Fatima',
    Email: 'fatima@example.com',
    Image_Link: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    DOB: '2006-01-20'
  }
];

export const mockAttendanceRecords: AttendanceRecord[] = [
  {
    ID: 1,
    ID_No: 101,
    Name: 'Muhab',
    Timestamp: new Date().toISOString(),
    confidence: 0.95,
    status: 'present'
  },
  {
    ID: 2,
    ID_No: 102,
    Name: 'Salena',
    Timestamp: new Date(Date.now() - 300000).toISOString(),
    confidence: 0.92,
    status: 'present'
  },
  {
    ID: 3,
    ID_No: 103,
    Name: 'Misbah',
    Timestamp: new Date(Date.now() - 600000).toISOString(),
    confidence: 0.88,
    status: 'late'
  }
];