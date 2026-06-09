export interface User {
  ID_No: number;
  Name: string;
  Email: string;
  Image_Link?: string;
  DOB?: string;
}

export interface AttendanceRecord {
  ID: number;
  ID_No: number;
  Name: string;
  Timestamp: string;
  confidence?: number;
  status: 'present' | 'absent' | 'late';
}

export interface FaceDetection {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  userId?: number;
  userName?: string;
}

export interface AttendanceStats {
  totalStudents: number;
  presentToday: number;
  absentToday: number;
  lateToday: number;
  attendanceRate: number;
}