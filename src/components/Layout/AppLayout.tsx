import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { View } from '../../App';

interface AppLayoutProps {
  children: React.ReactNode;
  onViewChange: (view: View) => void;
  currentView: View;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  onViewChange, 
  currentView,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        onViewChange={onViewChange} 
        currentView={currentView}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};