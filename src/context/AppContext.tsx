import React, { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Category, Goal, DailyGoal } from '../types';
import { defaultCategories } from '../data/defaultData';

interface AppContextType {
  categories: Category[];
  goals: Goal[];
  dailyGoals: DailyGoal[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateGoal: (goal: Goal) => void;
  deleteGoal: (id: string) => void;
  addDailyGoal: (dailyGoal: Omit<DailyGoal, 'id'>) => void;
  updateDailyGoal: (dailyGoal: DailyGoal) => void;
  deleteDailyGoal: (id: string) => void;
  toggleGoalComplete: (id: string) => void;
  updateGoalProgress: (id: string, progress: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [dailyGoals, setDailyGoals] = useState<DailyGoal[]>([]);

  // Initialize from localStorage or defaults
  useEffect(() => {
    const storedCategories = localStorage.getItem('categories');
    const storedGoals = localStorage.getItem('goals');
    const storedDailyGoals = localStorage.getItem('dailyGoals');

    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    } else {
      setCategories(defaultCategories);
    }

    if (storedGoals) {
      setGoals(JSON.parse(storedGoals));
    }

    if (storedDailyGoals) {
      setDailyGoals(JSON.parse(storedDailyGoals));
    }
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('dailyGoals', JSON.stringify(dailyGoals));
  }, [dailyGoals]);

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory = { ...category, id: uuidv4() };
    setCategories([...categories, newCategory]);
  };

  const updateCategory = (updatedCategory: Category) => {
    setCategories(categories.map(category => 
      category.id === updatedCategory.id ? updatedCategory : category
    ));
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  const addGoal = (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newGoal = { 
      ...goal, 
      id: uuidv4(), 
      createdAt: now, 
      updatedAt: now 
    };
    setGoals([...goals, newGoal]);
  };

  const updateGoal = (updatedGoal: Goal) => {
    const now = new Date().toISOString();
    setGoals(goals.map(goal => 
      goal.id === updatedGoal.id 
        ? { ...updatedGoal, updatedAt: now } 
        : goal
    ));
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
    // Also delete any daily goals associated with this goal
    setDailyGoals(dailyGoals.filter(dailyGoal => dailyGoal.goalId !== id));
  };

  const addDailyGoal = (dailyGoal: Omit<DailyGoal, 'id'>) => {
    const newDailyGoal = { ...dailyGoal, id: uuidv4() };
    setDailyGoals([...dailyGoals, newDailyGoal]);
  };

  const updateDailyGoal = (updatedDailyGoal: DailyGoal) => {
    setDailyGoals(dailyGoals.map(dailyGoal => 
      dailyGoal.id === updatedDailyGoal.id ? updatedDailyGoal : dailyGoal
    ));
  };

  const deleteDailyGoal = (id: string) => {
    setDailyGoals(dailyGoals.filter(dailyGoal => dailyGoal.id !== id));
  };

  const toggleGoalComplete = (id: string) => {
    setGoals(goals.map(goal => 
      goal.id === id 
        ? { 
            ...goal, 
            completed: !goal.completed, 
            progress: !goal.completed ? 100 : goal.progress,
            updatedAt: new Date().toISOString() 
          } 
        : goal
    ));
  };

  const updateGoalProgress = (id: string, progress: number) => {
    setGoals(goals.map(goal => 
      goal.id === id 
        ? { 
            ...goal, 
            progress,
            completed: progress === 100,
            updatedAt: new Date().toISOString() 
          } 
        : goal
    ));
  };

  return (
    <AppContext.Provider
      value={{
        categories,
        goals,
        dailyGoals,
        addCategory,
        updateCategory,
        deleteCategory,
        addGoal,
        updateGoal,
        deleteGoal,
        addDailyGoal,
        updateDailyGoal,
        deleteDailyGoal,
        toggleGoalComplete,
        updateGoalProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};