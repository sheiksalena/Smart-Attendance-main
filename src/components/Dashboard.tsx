import React from 'react';
import { Users, UserCheck, UserX, Clock, TrendingUp, Calendar } from 'lucide-react';
import { useAttendance } from '../hooks/useAttendance';
import { format } from 'date-fns';

export const Dashboard: React.FC = () => {
  const { attendanceRecords, getAttendanceStats } = useAttendance();
  const stats = getAttendanceStats();

  const recentAttendance = attendanceRecords.slice(0, 10);

  const StatCard: React.FC<{
    title: string;
    value: number | string;
    icon: React.ReactNode;
    color: string;
    subtitle?: string;
  }> = ({ title, value, icon, color, subtitle }) => (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Attendance Dashboard</h2>
        <p className="text-gray-600">Overview of today's attendance and system statistics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          icon={<Users className="h-6 w-6 text-blue-600" />}
          color="bg-blue-100"
        />
        <StatCard
          title="Present Today"
          value={stats.presentToday}
          icon={<UserCheck className="h-6 w-6 text-green-600" />}
          color="bg-green-100"
        />
        <StatCard
          title="Absent Today"
          value={stats.absentToday}
          icon={<UserX className="h-6 w-6 text-red-600" />}
          color="bg-red-100"
        />
        <StatCard
          title="Attendance Rate"
          value={`${Math.round(stats.attendanceRate)}%`}
          icon={<TrendingUp className="h-6 w-6 text-purple-600" />}
          color="bg-purple-100"
          subtitle="Today's rate"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Attendance */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6">
            <h3 className="text-xl font-bold text-white mb-2">Recent Attendance</h3>
            <p className="text-green-100">Latest attendance records</p>
          </div>
          
          <div className="p-6">
            {recentAttendance.length > 0 ? (
              <div className="space-y-4">
                {recentAttendance.map((record) => (
                  <div key={record.ID} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {record.Name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{record.Name}</p>
                        <p className="text-sm text-gray-600">ID: {record.ID_No}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {format(new Date(record.Timestamp), 'HH:mm')}
                      </p>
                      <p className="text-xs text-gray-500">
                        {format(new Date(record.Timestamp), 'MMM dd')}
                      </p>
                      {record.confidence && (
                        <p className="text-xs text-green-600">
                          {Math.round(record.confidence * 100)}% match
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No attendance records yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Today's Summary */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
            <h3 className="text-xl font-bold text-white mb-2">Today's Summary</h3>
            <p className="text-purple-100">Attendance breakdown for {format(new Date(), 'MMMM dd, yyyy')}</p>
          </div>
          
          <div className="p-6">
            <div className="space-y-6">
              {/* Attendance Rate Circle */}
              <div className="flex items-center justify-center">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="8"
                      strokeDasharray={`${(stats.attendanceRate / 100) * 314} 314`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">
                        {Math.round(stats.attendanceRate)}%
                      </p>
                      <p className="text-xs text-gray-600">Attendance</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Breakdown */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <UserCheck className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-800">Present</span>
                  </div>
                  <span className="font-bold text-green-800">{stats.presentToday}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Late</span>
                  </div>
                  <span className="font-bold text-yellow-800">{stats.lateToday}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <UserX className="h-5 w-5 text-red-600" />
                    <span className="font-medium text-red-800">Absent</span>
                  </div>
                  <span className="font-bold text-red-800">{stats.absentToday}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};