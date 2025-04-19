import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Goal } from '../../types';
import { 
  CheckCircle, 
  Circle, 
  Flag, 
  MoreVertical,
  Calendar,
  Edit,
  Trash2,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';

interface GoalListProps {
  goals: Goal[];
  limit?: number;
}

export const GoalList: React.FC<GoalListProps> = ({ goals, limit }) => {
  const { categories, toggleGoalComplete } = useAppContext();
  
  // Limit the number of goals if specified
  const displayGoals = limit ? goals.slice(0, limit) : goals;
  
  const getCategory = (categoryId: string) => {
    return categories.find(category => category.id === categoryId);
  };
  
  // Format date to display in a more readable format
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric'
    });
  };
  
  // Check if a deadline is today
  const isToday = (dateString?: string) => {
    if (!dateString) return false;
    
    const today = new Date().toISOString().split('T')[0];
    return dateString.startsWith(today);
  };
  
  // Check if a deadline is in the past (overdue)
  const isPastDue = (dateString?: string) => {
    if (!dateString) return false;
    
    const today = new Date().setHours(0, 0, 0, 0);
    const deadline = new Date(dateString).setHours(0, 0, 0, 0);
    return deadline < today;
  };
  
  return (
    <ul className="divide-y divide-gray-200">
      {displayGoals.length === 0 ? (
        <li className="py-4 text-center text-gray-500">No goals found</li>
      ) : (
        displayGoals.map(goal => {
          const category = getCategory(goal.categoryId);
          
          return (
            <li key={goal.id} className="py-4">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => toggleGoalComplete(goal.id)}
                  className="flex-shrink-0 focus:outline-none"
                >
                  {goal.completed ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : (
                    <Circle className="h-6 w-6 text-gray-300 hover:text-blue-500" />
                  )}
                </button>
                
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium ${
                      goal.completed ? 'text-gray-400 line-through' : 'text-gray-900'
                    }`}>
                      {goal.title}
                    </p>
                    
                    <div className="flex items-center space-x-2">
                      {goal.priority === 'high' && (
                        <Flag size={16} className="text-red-500" />
                      )}
                      
                      {goal.deadline && (
                        <div className={`flex items-center px-2 py-1 rounded-full text-xs ${
                          isPastDue(goal.deadline)
                            ? 'bg-red-100 text-red-800'
                            : isToday(goal.deadline)
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                        }`}>
                          {isPastDue(goal.deadline) && (
                            <AlertTriangle size={12} className="mr-1" />
                          )}
                          <Calendar size={12} className="mr-1" />
                          <span>{formatDate(goal.deadline)}</span>
                        </div>
                      )}
                      
                      <div className="relative group">
                        <button className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100 focus:outline-none">
                          <MoreVertical size={16} className="text-gray-500" />
                        </button>
                        
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                          <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <Edit size={16} className="mr-2" />
                            Edit
                          </button>
                          <button className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                            <Trash2 size={16} className="mr-2" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {goal.description && (
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                      {goal.description}
                    </p>
                  )}
                  
                  <div className="mt-2 flex items-center">
                    {category && (
                      <div 
                        className="flex items-center px-2 py-1 rounded-full text-xs font-medium mr-2"
                        style={{ 
                          backgroundColor: `${category.color}20`, 
                          color: category.color 
                        }}
                      >
                        {category.name}
                      </div>
                    )}
                    
                    {/* Progress bar */}
                    <div className="flex-1 ml-2">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="h-1.5 rounded-full bg-blue-600" 
                          style={{ 
                            width: `${goal.progress}%`,
                            transition: 'width 0.3s ease' 
                          }}
                        ></div>
                      </div>
                    </div>
                    
                    <span className="ml-2 text-xs text-gray-500">
                      {goal.progress}%
                    </span>
                  </div>
                </div>
                
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </li>
          );
        })
      )}
      
      {limit && goals.length > limit && (
        <li className="py-4 text-center">
          <button className="text-sm text-blue-600 hover:text-blue-700">
            View all ({goals.length}) goals
          </button>
        </li>
      )}
    </ul>
  );
};