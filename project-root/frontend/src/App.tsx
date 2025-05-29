import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import DetectionPage from './pages/DetectionPage';
import EducationPage from './pages/EducationPage';
import HealthFacilitiesPage from './pages/HealthFacilitiesPage';
import HistoryPage from './pages/HistoryPage';
import { TBDetectionProvider } from './context/TBDetectionContext';

function App() {
  return (
    <TBDetectionProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="detection" element={<DetectionPage />} />
          <Route path="education" element={<EducationPage />} />
          <Route path="facilities" element={<HealthFacilitiesPage />} />
          <Route path="history" element={<HistoryPage />} />
        </Route>
      </Routes>
    </TBDetectionProvider>
  );
}

export default App;