export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  deadline?: string;
  completed: boolean;
  progress: number; // 0-100
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

export interface DailyGoal {
  id: string;
  goalId: string;
  date: string;
  completed: boolean;
}