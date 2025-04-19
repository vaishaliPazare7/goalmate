import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { X, Palette } from 'lucide-react';

interface AddCategoryModalProps {
  onClose: () => void;
}

export const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ onClose }) => {
  const { addCategory } = useAppContext();
  const [name, setName] = useState('');
  const [color, setColor] = useState('#3B82F6');
  const [icon, setIcon] = useState('briefcase');

  const icons = [
    { value: 'briefcase', label: 'Work' },
    { value: 'heart', label: 'Health' },
    { value: 'users', label: 'Social' },
    { value: 'book-open', label: 'Education' },
    { value: 'dollar-sign', label: 'Finance' },
    { value: 'home', label: 'Home' },
    { value: 'music', label: 'Hobbies' },
    { value: 'target', label: 'Goals' },
  ];

  const colors = [
    '#3B82F6', // Blue
    '#10B981', // Green
    '#EC4899', // Pink
    '#F97316', // Orange
    '#6366F1', // Indigo
    '#EF4444', // Red
    '#8B5CF6', // Purple
    '#14B8A6', // Teal
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addCategory({
      name,
      color,
      icon,
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

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center pb-3">
              <h3 className="text-lg font-medium text-gray-900">Add New Category</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Category Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter category name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((colorOption) => (
                    <button
                      key={colorOption}
                      type="button"
                      onClick={() => setColor(colorOption)}
                      className={`w-8 h-8 rounded-full focus:outline-none ring-2 ring-offset-2 ${
                        color === colorOption ? 'ring-blue-500' : 'ring-transparent'
                      }`}
                      style={{ backgroundColor: colorOption }}
                    />
                  ))}
                  <button
                    type="button"
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center focus:outline-none hover:bg-gray-50"
                  >
                    <Palette size={16} className="text-gray-400" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icon
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {icons.map(({ value, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setIcon(value)}
                      className={`p-3 rounded-lg border focus:outline-none ${
                        icon === value
                          ? 'border-blue-500 bg-blue-50 text-blue-600'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-xs">{label}</span>
                      </div>
                    </button>
                  ))}
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
              Create Category
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