
import React, { useState } from 'react';
import { MealItem, MealType } from '../types';
import { Icon } from './Icon';

interface MealCardProps {
  title: string;
  mealType: MealType;
  items: MealItem[];
  onUpdate: (mealType: MealType, updatedItems: MealItem[]) => void;
}

const MealCard: React.FC<MealCardProps> = ({ title, mealType, items = [], onUpdate }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newItemName, setNewItemName] = useState('');

  const handleAddItem = () => {
    if (newItemName.trim()) {
      const newItem: MealItem = {
        id: new Date().toISOString(),
        name: newItemName.trim(),
      };
      onUpdate(mealType, [...items, newItem]);
      setNewItemName('');
      setIsAdding(false);
    }
  };

  const handleDeleteItem = (id: string) => {
    onUpdate(mealType, items.filter(item => item.id !== id));
  };
  
  const handleItemChange = (id: string, newName: string) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, name: newName } : item
    );
    onUpdate(mealType, updatedItems);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-semibold text-slate-800">{title}</h4>
        <button onClick={() => setIsAdding(!isAdding)} className="p-2 rounded-full hover:bg-slate-100 text-blue-500">
            <Icon name="plus" className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-2 flex-grow">
        {items.map(item => (
          <div key={item.id} className="flex items-center bg-slate-50 p-2 rounded-md gap-2">
            <input
              type="text"
              value={item.name}
              onChange={(e) => handleItemChange(item.id, e.target.value)}
              className="bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-300 rounded-sm px-1 w-full text-sm text-slate-800"
              aria-label="Edit meal item"
            />
            <button onClick={() => handleDeleteItem(item.id)} className="p-1 rounded-full text-slate-400 hover:bg-red-100 hover:text-red-500 flex-shrink-0">
              <Icon name="trash" className="w-4 h-4" />
            </button>
          </div>
        ))}
        {items.length === 0 && !isAdding && (
             <p className="text-center text-sm text-slate-400 py-2">No items yet.</p>
        )}
      </div>

      {isAdding && (
        <div className="mt-4 pt-4 border-t border-slate-200 space-y-2">
          <input
            type="text"
            placeholder="New food suggestion"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm"
          />
          <button onClick={handleAddItem} className="w-full bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-600">
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default MealCard;