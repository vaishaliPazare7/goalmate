import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { AppLayout } from './components/Layout/AppLayout';
import { DashboardOverview } from './components/Dashboard/DashboardOverview';
import { CalendarView } from './components/Calendar/CalendarView';
import { ProgressView } from './components/Progress/ProgressView';
import { ProfileView } from './components/Profile/ProfileView';

export type View = 'dashboard' | 'calendar' | 'progress' | 'profile';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'calendar':
        return <CalendarView />;
      case 'progress':
        return <ProgressView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <AppProvider>
      <AppLayout 
        onViewChange={setCurrentView} 
        currentView={currentView}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      >
        {renderView()}
      </AppLayout>
    </AppProvider>
  );
}

export default App;