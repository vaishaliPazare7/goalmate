import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { X, Calendar, Flag } from 'lucide-react';

interface AddGoalModalProps {
  onClose: () => void;
}

export const AddGoalModal: React.FC<AddGoalModalProps> = ({ onClose }) => {
  const { categories, addGoal } = useAppContext();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    addGoal({
      title,
      description,
      categoryId,
      deadline: deadline || undefined,
      completed: false,
      progress: 0,
      priority,
    });
    
    onClose();
  };
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div 
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center pb-3">
              <h3 className="text-lg font-medium text-gray-900" id="modal-headline">Add New Goal</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter goal title"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Describe your goal"
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                  Deadline
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="deadline"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Priority
                </label>
                <div className="mt-2 flex space-x-2">
                  <div>
                    <input
                      type="radio"
                      id="low"
                      name="priority"
                      checked={priority === 'low'}
                      onChange={() => setPriority('low')}
                      className="sr-only"
                    />
                    <label
                      htmlFor="low"
                      className={`inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium cursor-pointer ${
                        priority === 'low'
                          ? 'bg-green-50 border-green-500 text-green-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Flag size={16} className={priority === 'low' ? 'text-green-500 mr-1' : 'text-gray-400 mr-1'} />
                      Low
                    </label>
                  </div>
                  
                  <div>
                    <input
                      type="radio"
                      id="medium"
                      name="priority"
                      checked={priority === 'medium'}
                      onChange={() => setPriority('medium')}
                      className="sr-only"
                    />
                    <label
                      htmlFor="medium"
                      className={`inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium cursor-pointer ${
                        priority === 'medium'
                          ? 'bg-yellow-50 border-yellow-500 text-yellow-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Flag size={16} className={priority === 'medium' ? 'text-yellow-500 mr-1' : 'text-gray-400 mr-1'} />
                      Medium
                    </label>
                  </div>
                  
                  <div>
                    <input
                      type="radio"
                      id="high"
                      name="priority"
                      checked={priority === 'high'}
                      onChange={() => setPriority('high')}
                      className="sr-only"
                    />
                    <label
                      htmlFor="high"
                      className={`inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium cursor-pointer ${
                        priority === 'high'
                          ? 'bg-red-50 border-red-500 text-red-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Flag size={16} className={priority === 'high' ? 'text-red-500 mr-1' : 'text-gray-400 mr-1'} />
                      High
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>
          
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Create Goal
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};