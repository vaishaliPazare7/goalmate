import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const CalendarView: React.FC = () => {
  const { goals } = useAppContext();
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const monthYear = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getGoalsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return goals.filter(goal => goal.deadline?.startsWith(dateString));
  };

  const renderCalendarDays = () => {
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 bg-gray-50 border border-gray-200"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateString = date.toISOString().split('T')[0];
      const dayGoals = getGoalsForDate(date);
      const isToday = date.getTime() === today.getTime();

      days.push(
        <div
          key={day}
          className={`h-24 border border-gray-200 p-2 ${
            isToday ? 'bg-blue-50' : 'hover:bg-gray-50'
          }`}
        >
          <div className="flex justify-between items-start">
            <span className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
              {day}
            </span>
            {dayGoals.length > 0 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {dayGoals.length}
              </span>
            )}
          </div>
          <div className="mt-2 space-y-1">
            {dayGoals.slice(0, 2).map(goal => (
              <div
                key={goal.id}
                className="text-xs truncate px-1 py-0.5 rounded bg-white shadow-sm border border-gray-200"
              >
                {goal.title}
              </div>
            ))}
            {dayGoals.length > 2 && (
              <div className="text-xs text-gray-500">+{dayGoals.length - 2} more</div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={previousMonth}
            className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <span className="text-lg font-medium text-gray-900">{monthYear}</span>
          <button
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="grid grid-cols-7 gap-px">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="py-2 text-center text-sm font-medium text-gray-700 bg-gray-50">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {renderCalendarDays()}
        </div>
      </div>
    </div>
  );
};