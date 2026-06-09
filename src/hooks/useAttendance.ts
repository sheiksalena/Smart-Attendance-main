import { useState, useCallback } from 'react';
import { AttendanceRecord, AttendanceStats } from '../types';
import { mockAttendanceRecords, mockUsers } from '../data/mockData';

export const useAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(mockAttendanceRecords);
  const [isLoading, setIsLoading] = useState(false);

  const markAttendance = useCallback(async (userId: number, userName: string, confidence: number) => {
    setIsLoading(true);
    
    // Check if user already marked attendance today
    const today = new Date().toDateString();
    const existingRecord = attendanceRecords.find(record => 
      record.ID_No === userId && 
      new Date(record.Timestamp).toDateString() === today
    );

    if (existingRecord) {
      setIsLoading(false);
      return { success: false, message: 'Attendance already marked for today' };
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newRecord: AttendanceRecord = {
      ID: attendanceRecords.length + 1,
      ID_No: userId,
      Name: userName,
      Timestamp: new Date().toISOString(),
      confidence,
      status: 'present'
    };

    setAttendanceRecords(prev => [newRecord, ...prev]);
    setIsLoading(false);
    
    return { success: true, message: 'Attendance marked successfully' };
  }, [attendanceRecords]);

  const getAttendanceStats = useCallback((): AttendanceStats => {
    const today = new Date().toDateString();
    const todayRecords = attendanceRecords.filter(record => 
      new Date(record.Timestamp).toDateString() === today
    );

    const totalStudents = mockUsers.length;
    const presentToday = todayRecords.filter(r => r.status === 'present').length;
    const lateToday = todayRecords.filter(r => r.status === 'late').length;
    const absentToday = totalStudents - presentToday - lateToday;
    const attendanceRate = totalStudents > 0 ? ((presentToday + lateToday) / totalStudents) * 100 : 0;

    return {
      totalStudents,
      presentToday,
      absentToday,
      lateToday,
      attendanceRate
    };
  }, [attendanceRecords]);

  return {
    attendanceRecords,
    isLoading,
    markAttendance,
    getAttendanceStats
  };
};