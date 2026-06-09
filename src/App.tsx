import React, { useState } from 'react';
import { Header } from './components/Header';
import { CameraView } from './components/CameraView';
import { StudentsView } from './components/StudentsView';
import { Dashboard } from './components/Dashboard';

function App() {
  const [activeTab, setActiveTab] = useState('camera');

  const renderActiveView = () => {
    switch (activeTab) {
      case 'camera':
        return <CameraView />;
      case 'students':
        return <StudentsView />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <CameraView />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="py-8">
        {renderActiveView()}
      </main>
    </div>
  );
}

export default App;