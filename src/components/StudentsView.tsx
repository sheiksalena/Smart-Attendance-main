import React from 'react';
import { User, Mail, Calendar, UserCheck } from 'lucide-react';
import { mockUsers } from '../data/mockData';
import { useAttendance } from '../hooks/useAttendance';

export const StudentsView: React.FC = () => {
  const { attendanceRecords } = useAttendance();

  const getStudentAttendanceStatus = (userId: number) => {
    const today = new Date().toDateString();
    const todayRecord = attendanceRecords.find(record => 
      record.ID_No === userId && 
      new Date(record.Timestamp).toDateString() === today
    );
    return todayRecord?.status || 'absent';
  };

  const getAttendanceCount = (userId: number) => {
    return attendanceRecords.filter(record => record.ID_No === userId).length;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'late': return 'bg-yellow-100 text-yellow-800';
      case 'absent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <h2 className="text-2xl font-bold text-white mb-2">Student Directory</h2>
          <p className="text-blue-100">Manage and view student information and attendance status</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockUsers.map((student) => {
              const status = getStudentAttendanceStatus(student.ID_No);
              const attendanceCount = getAttendanceCount(student.ID_No);
              
              return (
                <div key={student.ID_No} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative">
                      {student.Image_Link ? (
                        <img
                          src={student.Image_Link}
                          alt={student.Name}
                          className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center border-4 border-white shadow-md">
                          <User className="h-8 w-8 text-white" />
                        </div>
                      )}
                      <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center ${
                        status === 'present' ? 'bg-green-500' :
                        status === 'late' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}>
                        <UserCheck className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{student.Name}</h3>
                      <p className="text-sm text-gray-600">ID: {student.ID_No}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span>{student.Email}</span>
                    </div>
                    
                    {student.DOB && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(student.DOB).toLocaleDateString()}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                      <span className="text-sm text-gray-600">
                        {attendanceCount} days attended
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {mockUsers.length === 0 && (
            <div className="text-center py-12">
              <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Students Found</h3>
              <p className="text-gray-600">Add students to the system to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};