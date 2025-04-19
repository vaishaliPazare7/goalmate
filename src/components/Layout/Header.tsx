import React, { useState } from "react";
import { Menu, Bell, Plus, Search, X } from "lucide-react";
import { AddGoalModal } from "../Goals/AddGoalModal";

interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-gray-200 z-20 py-4 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div></div>

        {/* <div className="flex-1 max-w-xl mx-4 hidden md:block">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search goals..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div> */}

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowAddGoalModal(true)}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus size={16} className="mr-1" />
            <span className="hidden sm:inline">Add Goal</span>
          </button>

          {/* <button className="text-gray-500 hover:text-gray-700 focus:outline-none relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 transform translate-x-1/2 -translate-y-1/2"></span>
          </button> */}
        </div>
      </header>

      {showAddGoalModal && (
        <AddGoalModal onClose={() => setShowAddGoalModal(false)} />
      )}
    </>
  );
};
