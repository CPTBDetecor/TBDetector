import React, { createContext, useContext, useState, useEffect } from 'react';

export interface DetectionResult {
  id: string;
  date: string;
  riskLevel: 'low' | 'medium' | 'high';
  score: number;
  symptoms: string[];
}

interface TBDetectionContextType {
  detectionHistory: DetectionResult[];
  addDetectionResult: (result: Omit<DetectionResult, 'id' | 'date'>) => void;
  clearHistory: () => void;
}

const TBDetectionContext = createContext<TBDetectionContextType | undefined>(undefined);

export const TBDetectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [detectionHistory, setDetectionHistory] = useState<DetectionResult[]>([]);

  // Load history from localStorage on initial render
  useEffect(() => {
    const savedHistory = localStorage.getItem('tbDetectionHistory');
    if (savedHistory) {
      try {
        setDetectionHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Error parsing history from localStorage', error);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('tbDetectionHistory', JSON.stringify(detectionHistory));
  }, [detectionHistory]);

  const addDetectionResult = (result: Omit<DetectionResult, 'id' | 'date'>) => {
    console.log('addDetectionResult called', result); // Debug log
    const newResult: DetectionResult = {
      ...result,
      id: `tb-${Date.now()}`,
      date: new Date().toISOString(),
    };

    setDetectionHistory(prev => {
      const updated = [newResult, ...prev].slice(0, 10);
      return updated;
    });
  };

  const clearHistory = () => {
    setDetectionHistory([]);
  };

  return (
    <TBDetectionContext.Provider value={{ detectionHistory, addDetectionResult, clearHistory }}>
      {children}
    </TBDetectionContext.Provider>
  );
};

export const useTBDetection = () => {
  const context = useContext(TBDetectionContext);
  if (context === undefined) {
    throw new Error('useTBDetection must be used within a TBDetectionProvider');
  }
  return context;
};