import React, { useEffect, useState } from 'react';
import { Camera, CameraOff, Scan, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { useCamera } from '../hooks/useCamera';
import { useFaceRecognition } from '../hooks/useFaceRecognition';
import { useAttendance } from '../hooks/useAttendance';

export const CameraView: React.FC = () => {
  const { videoRef, isActive, error, startCamera, stopCamera } = useCamera();
  const { detectedFaces, isProcessing, simulateFaceDetection, clearDetections } = useFaceRecognition();
  const { markAttendance, isLoading } = useAttendance();
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        simulateFaceDetection();
      }, 3000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, simulateFaceDetection]);

  const handleMarkAttendance = async (userId: number, userName: string, confidence: number) => {
    const result = await markAttendance(userId, userName, confidence);
    setMessage({
      type: result.success ? 'success' : 'error',
      text: result.message
    });
    
    if (result.success) {
      clearDetections();
    }
    
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <h2 className="text-2xl font-bold text-white mb-2">Live Face Recognition</h2>
          <p className="text-blue-100">Position yourself in front of the camera for automatic attendance marking</p>
        </div>

        <div className="p-6">
          {/* Camera Controls */}
          <div className="flex justify-center mb-6">
            <button
              onClick={isActive ? stopCamera : startCamera}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {isActive ? <CameraOff className="h-5 w-5" /> : <Camera className="h-5 w-5" />}
              <span>{isActive ? 'Stop Camera' : 'Start Camera'}</span>
            </button>
          </div>

          {/* Camera Feed */}
          <div className="relative bg-gray-900 rounded-xl overflow-hidden mb-6" style={{ aspectRatio: '4/3' }}>
            {error ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-400" />
                  <p className="text-lg font-medium mb-2">Camera Error</p>
                  <p className="text-gray-300">{error}</p>
                </div>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                
                {/* Face Detection Overlay */}
                {detectedFaces.map((face, index) => (
                  <div
                    key={index}
                    className="absolute border-2 border-green-400 bg-green-400/20 rounded"
                    style={{
                      left: `${(face.x / 640) * 100}%`,
                      top: `${(face.y / 480) * 100}%`,
                      width: `${(face.width / 640) * 100}%`,
                      height: `${(face.height / 480) * 100}%`,
                    }}
                  >
                    {face.userName && (
                      <div className="absolute -top-8 left-0 bg-green-500 text-white px-2 py-1 rounded text-sm font-medium">
                        {face.userName} ({Math.round(face.confidence * 100)}%)
                      </div>
                    )}
                  </div>
                ))}

                {/* Processing Indicator */}
                {isProcessing && (
                  <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-2 rounded-lg flex items-center space-x-2">
                    <Scan className="h-4 w-4 animate-pulse" />
                    <span className="text-sm">Scanning...</span>
                  </div>
                )}

                {/* No Camera Overlay */}
                {!isActive && !error && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Camera className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                      <p className="text-xl font-medium mb-2">Camera Inactive</p>
                      <p className="text-gray-300">Click "Start Camera" to begin face recognition</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Detected Faces */}
          {detectedFaces.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Detected Students</span>
              </h3>
              
              {detectedFaces.map((face, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {face.userName?.charAt(0) || '?'}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{face.userName || 'Unknown'}</p>
                      <p className="text-sm text-gray-600">
                        Confidence: {Math.round(face.confidence * 100)}%
                      </p>
                    </div>
                  </div>
                  
                  {face.userId && face.userName && (
                    <button
                      onClick={() => handleMarkAttendance(face.userId!, face.userName!, face.confidence)}
                      disabled={isLoading}
                      className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <Loader className="h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle className="h-4 w-4" />
                      )}
                      <span>{isLoading ? 'Marking...' : 'Mark Attendance'}</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Status Message */}
          {message && (
            <div className={`mt-4 p-4 rounded-lg flex items-center space-x-2 ${
              message.type === 'success' ? 'bg-green-100 text-green-800' :
              message.type === 'error' ? 'bg-red-100 text-red-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
              <span>{message.text}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};