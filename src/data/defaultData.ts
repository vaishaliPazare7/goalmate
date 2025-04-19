import { Category } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const defaultCategories: Category[] = [
  {
    id: uuidv4(),
    name: 'Career',
    color: '#3B82F6', // Blue
    icon: 'briefcase',
  },
  {
    id: uuidv4(),
    name: 'Health',
    color: '#10B981', // Green
    icon: 'heart',
  },
  {
    id: uuidv4(),
    name: 'Relationships',
    color: '#EC4899', // Pink
    icon: 'users',
  },
  {
    id: uuidv4(),
    name: 'Personal Growth',
    color: '#F97316', // Orange
    icon: 'book-open',
  },
  {
    id: uuidv4(),
    name: 'Finance',
    color: '#6366F1', // Indigo
    icon: 'dollar-sign',
  },
];