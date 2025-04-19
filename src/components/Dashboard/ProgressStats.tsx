import React from 'react';
import { useAppContext } from '../../context/AppContext';

export const ProgressStats: React.FC = () => {
  const { goals, categories } = useAppContext();
  
  // Calculate overall progress percentage
  const totalGoals = goals.length;
  const completedGoals = goals.filter(goal => goal.completed).length;
  const overallProgress = totalGoals > 0 
    ? Math.round((completedGoals / totalGoals) * 100) 
    : 0;
  
  // Calculate progress by category
  const categoryProgress = categories.map(category => {
    const categoryGoals = goals.filter(goal => goal.categoryId === category.id);
    const categoryCompletedGoals = categoryGoals.filter(goal => goal.completed);
    
    const progress = categoryGoals.length > 0 
      ? Math.round((categoryCompletedGoals.length / categoryGoals.length) * 100) 
      : 0;
    
    return {
      ...category,
      progress,
      count: categoryGoals.length
    };
  });
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center">
          <div className="relative h-32 w-32">
            <svg className="h-full w-full" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#e0e0e0"
                strokeWidth="2"
              ></circle>
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2"
                strokeDasharray={`${(overallProgress / 100) * 100} 100`}
                strokeLinecap="round"
                transform="rotate(-90 18 18)"
                style={{ transition: 'all 0.5s ease' }}
              ></circle>
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="text-3xl font-bold text-gray-900">{overallProgress}%</div>
            </div>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-500">Overall Progress</p>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">By Category</h3>
        
        {categoryProgress.map(category => (
          <div key={category.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div 
                  className="h-3 w-3 rounded-full mr-2" 
                  style={{ backgroundColor: category.color }}
                ></div>
                <span className="text-sm font-medium text-gray-700">
                  {category.name}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                {category.progress}% ({category.count})
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="h-1.5 rounded-full" 
                style={{ 
                  width: `${category.progress}%`, 
                  backgroundColor: category.color,
                  transition: 'width 0.5s ease'
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};