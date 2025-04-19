import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { CheckCircle2, Clock, Target, Award } from 'lucide-react';
import { GoalList } from '../Goals/GoalList';
import { ProgressStats } from './ProgressStats';

export const DashboardOverview: React.FC = () => {
  const { goals } = useAppContext();
  
  // Calculate statistics
  const totalGoals = goals.length;
  const completedGoals = goals.filter(goal => goal.completed).length;
  const inProgressGoals = goals.filter(goal => !goal.completed && goal.progress > 0).length;
  const notStartedGoals = goals.filter(goal => !goal.completed && goal.progress === 0).length;
  
  // Get today's date in ISO format (YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0];
  
  // Filter goals with deadlines today
  const todaysGoals = goals.filter(goal => {
    if (!goal.deadline) return false;
    return goal.deadline.startsWith(today);
  });

  // Get high priority incomplete goals
  const highPriorityGoals = goals.filter(goal => 
    goal.priority === 'high' && !goal.completed
  );
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Goals" 
          value={totalGoals} 
          icon={<Target className="text-blue-500" />}
          bgColor="bg-blue-50"
        />
        <StatCard 
          title="Completed" 
          value={completedGoals} 
          icon={<CheckCircle2 className="text-green-500" />} 
          bgColor="bg-green-50"
        />
        <StatCard 
          title="In Progress" 
          value={inProgressGoals} 
          icon={<Clock className="text-yellow-500" />}
          bgColor="bg-yellow-50" 
        />
        <StatCard 
          title="Not Started" 
          value={notStartedGoals} 
          icon={<Target className="text-gray-500" />}
          bgColor="bg-gray-50" 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Today's Goals</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
          </div>
          
          {todaysGoals.length > 0 ? (
            <GoalList goals={todaysGoals} limit={5} />
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <Award size={48} className="mb-4 text-gray-300" />
              <p className="mb-2">No goals scheduled for today!</p>
              <button className="text-sm text-blue-600 hover:text-blue-700">
                Add a goal for today
              </button>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Progress</h2>
          <ProgressStats />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">High Priority</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
        </div>
        
        {highPriorityGoals.length > 0 ? (
          <GoalList goals={highPriorityGoals} limit={5} />
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-gray-500">
            <p>No high priority goals!</p>
          </div>
        )}
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, bgColor }) => (
  <div className={`${bgColor} rounded-lg p-6 shadow-sm`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
      <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-sm">
        {icon}
      </div>
    </div>
  </div>
);