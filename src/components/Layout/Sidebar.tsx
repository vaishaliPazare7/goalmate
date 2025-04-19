import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { 
  Home, 
  BarChart2, 
  Calendar,
  Plus,
  Briefcase, 
  Heart, 
  Users, 
  BookOpen, 
  DollarSign,
  User
} from 'lucide-react';
import { View } from '../../App';
import { AddCategoryModal } from '../Categories/AddCategoryModal';

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, text, active = false, onClick }) => (
  <li 
    onClick={onClick}
    className={`flex items-center space-x-3 px-4 py-3 cursor-pointer rounded-md transition-colors duration-200 ${
      active 
        ? 'bg-blue-50 text-blue-600' 
        : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    <div className={active ? 'text-blue-600' : 'text-gray-500'}>
      {icon}
    </div>
    <span className="font-medium">{text}</span>
  </li>
);

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'briefcase': return <Briefcase size={20} />;
    case 'heart': return <Heart size={20} />;
    case 'users': return <Users size={20} />;
    case 'book-open': return <BookOpen size={20} />;
    case 'dollar-sign': return <DollarSign size={20} />;
    default: return <Plus size={20} />;
  }
};

interface SidebarProps {
  onViewChange: (view: View) => void;
  currentView: View;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  onViewChange, 
  currentView,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) => {
  const { categories } = useAppContext();
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  const handleViewChange = (view: View) => {
    onViewChange(view);
    setIsMobileMenuOpen(false);
  };
  
  return (
    <>
      <aside 
        className={`${
          isMobileMenuOpen ? 'fixed inset-0 z-40 transform translate-x-0' : 'hidden'
        } md:flex md:flex-col md:w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out`}
      >
        <div className="px-6 pt-6 pb-4">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <BarChart2 className="mr-2 text-blue-600" />
            GoalTracker
          </h1>
        </div>
        
        <div className="flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-3 py-3 space-y-1">
            <ul className="space-y-1">
              <NavItem 
                icon={<Home size={20} />} 
                text="Dashboard" 
                active={currentView === 'dashboard'}
                onClick={() => handleViewChange('dashboard')}
              />
              <NavItem 
                icon={<Calendar size={20} />} 
                text="Calendar" 
                active={currentView === 'calendar'}
                onClick={() => handleViewChange('calendar')}
              />
              <NavItem 
                icon={<BarChart2 size={20} />} 
                text="Progress" 
                active={currentView === 'progress'}
                onClick={() => handleViewChange('progress')}
              />
            </ul>
            
            <div className="mt-8">
              <h2 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Categories
              </h2>
              <ul className="mt-2 space-y-1">
                {categories.map(category => (
                  <NavItem 
                    key={category.id}
                    icon={getIconComponent(category.icon)}
                    text={category.name}
                  />
                ))}
                <li className="px-4 py-3">
                  <button 
                    onClick={() => setShowAddCategoryModal(true)}
                    className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    <Plus size={16} />
                    <span>Add Category</span>
                  </button>
                </li>
              </ul>
            </div>
          </nav>
          
          <div className="border-t border-gray-200 p-4">
            <NavItem 
              icon={<User size={20} />} 
              text="Profile" 
              active={currentView === 'profile'}
              onClick={() => handleViewChange('profile')}
            />
          </div>
        </div>
      </aside>

      {/* Mobile backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {showAddCategoryModal && (
        <AddCategoryModal onClose={() => setShowAddCategoryModal(false)} />
      )}
    </>
  );
};