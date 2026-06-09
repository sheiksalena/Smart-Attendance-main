import { useState, useCallback } from 'react';
import { FaceDetection } from '../types';
import { mockUsers } from '../data/mockData';

export const useFaceRecognition = () => {
  const [detectedFaces, setDetectedFaces] = useState<FaceDetection[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const simulateFaceDetection = useCallback(() => {
    setIsProcessing(true);
    
    // Simulate face detection processing time
    setTimeout(() => {
      // Simulate random face detection
      const shouldDetectFace = Math.random() > 0.3;
      
      if (shouldDetectFace) {
        const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
        const mockDetection: FaceDetection = {
          x: Math.random() * 400 + 100,
          y: Math.random() * 300 + 100,
          width: 120 + Math.random() * 80,
          height: 120 + Math.random() * 80,
          confidence: 0.85 + Math.random() * 0.15,
          userId: randomUser.ID_No,
          userName: randomUser.Name
        };
        setDetectedFaces([mockDetection]);
      } else {
        setDetectedFaces([]);
      }
      
      setIsProcessing(false);
    }, 1000 + Math.random() * 2000);
  }, []);

  const clearDetections = useCallback(() => {
    setDetectedFaces([]);
  }, []);

  return {
    detectedFaces,
    isProcessing,
    simulateFaceDetection,
    clearDetections
  };
};