import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { BarChart, CheckCircle2, Clock, Target } from 'lucide-react';

export const ProgressView: React.FC = () => {
  const { goals, categories } = useAppContext();

  // Calculate overall statistics
  const totalGoals = goals.length;
  const completedGoals = goals.filter(goal => goal.completed).length;
  const inProgressGoals = goals.filter(goal => !goal.completed && goal.progress > 0).length;
  const notStartedGoals = goals.filter(goal => !goal.completed && goal.progress === 0).length;
  const completionRate = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

  // Calculate category statistics
  const categoryStats = categories.map(category => {
    const categoryGoals = goals.filter(goal => goal.categoryId === category.id);
    const completed = categoryGoals.filter(goal => goal.completed).length;
    const total = categoryGoals.length;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      ...category,
      completed,
      total,
      progress,
    };
  });

  // Get goals completed in the last 30 days
  const last30Days = [...Array(30)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  });

  const completionTrend = last30Days.reduce((acc, date) => {
    const completedOnDate = goals.filter(
      goal => goal.completed && goal.updatedAt.startsWith(date)
    ).length;
    return { ...acc, [date]: completedOnDate };
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Progress Overview</h1>

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
          icon={<BarChart className="text-gray-500" />}
          bgColor="bg-gray-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Overall Progress</h2>
          <div className="flex items-center justify-center">
            <div className="relative h-48 w-48">
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
                  strokeDasharray={`${completionRate} 100`}
                  strokeLinecap="round"
                  transform="rotate(-90 18 18)"
                  style={{ transition: 'all 0.5s ease' }}
                ></circle>
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-4xl font-bold text-gray-900">{completionRate}%</div>
                <div className="text-sm text-gray-500">Completion Rate</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Category Progress</h2>
          <div className="space-y-4">
            {categoryStats.map(category => (
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
                    {category.completed}/{category.total} ({category.progress}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full"
                    style={{
                      width: `${category.progress}%`,
                      backgroundColor: category.color,
                      transition: 'width 0.5s ease',
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Completion Trend</h2>
        <div className="h-64">
          <div className="flex h-full items-end space-x-2">
            {Object.entries(completionTrend)
              .slice(-14)
              .map(([date, count]) => (
                <div
                  key={date}
                  className="flex-1 bg-blue-100 rounded-t"
                  style={{
                    height: `${(count / Math.max(...Object.values(completionTrend))) * 100}%`,
                    minHeight: count > 0 ? '4px' : '0',
                  }}
                >
                  <div className="transform -rotate-90 translate-y-6 text-xs text-gray-500 whitespace-nowrap">
                    {new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              ))}
          </div>
        </div>
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