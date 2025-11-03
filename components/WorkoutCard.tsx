import React from 'react';
import { Workout, Exercise } from '../types';
import { Icon } from './Icon';

interface WorkoutCardProps {
  workout: Workout;
  onUpdate: (updatedWorkout: Workout | null) => void;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, onUpdate }) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, field: keyof Exercise) => {
    const newExercises = [...workout.exercises];
    newExercises[index] = { ...newExercises[index], [field]: e.target.value };
    onUpdate({ ...workout, exercises: newExercises });
  };
  
  const handleExerciseToggle = (index: number, completed: boolean) => {
      const newExercises = [...workout.exercises];
      newExercises[index] = { ...newExercises[index], completed };
      onUpdate({ ...workout, exercises: newExercises });
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...workout, category: e.target.value });
  }

  const handleAddExercise = () => {
    const newExercise: Exercise = {
        id: `e-${Date.now()}`,
        name: '',
        sets: '',
        reps: '',
        weight: '',
        notes: '',
        completed: false
    };
    onUpdate({ ...workout, exercises: [...workout.exercises, newExercise] });
  };

  const handleDeleteExercise = (exerciseIndex: number) => {
      const newExercises = workout.exercises.filter((_, index) => index !== exerciseIndex);
      onUpdate({ ...workout, exercises: newExercises });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <input 
            type="text" 
            value={workout.category}
            onChange={handleCategoryChange}
            className="text-lg font-semibold text-slate-800 bg-transparent focus:outline-none focus:bg-slate-100 p-1 rounded-md w-full"
            placeholder="Workout Category"
        />
        <button
            onClick={() => onUpdate(null)}
            className="p-2 ml-2 rounded-full text-slate-400 hover:bg-red-100 hover:text-red-500 transition-colors flex-shrink-0"
            aria-label="Delete Workout"
        >
            <Icon name="trash" className="w-5 h-5"/>
        </button>
      </div>

      <div className="space-y-4">
        {workout.exercises.map((exercise, index) => (
          <div key={exercise.id} className="p-4 border border-slate-200 rounded-lg">
             <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 flex-grow">
                    <input
                        type="checkbox"
                        checked={exercise.completed}
                        onChange={(e) => handleExerciseToggle(index, e.target.checked)}
                        className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
                    />
                    <input 
                        type="text"
                        value={exercise.name}
                        onChange={(e) => handleInputChange(e, index, 'name')}
                        placeholder="Exercise Name"
                        className={`font-semibold bg-transparent focus:outline-none focus:bg-slate-50 p-1 rounded-md w-full ${exercise.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}
                    />
                </div>
                <button 
                    onClick={() => handleDeleteExercise(index)}
                    className="p-1 ml-2 rounded-full text-slate-400 hover:bg-red-100 hover:text-red-500 flex-shrink-0"
                    aria-label="Delete Exercise"
                >
                    <Icon name="trash" className="w-4 h-4"/>
                </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <InputGroup label="Sets" value={exercise.sets} onChange={(e) => handleInputChange(e, index, 'sets')} />
                <InputGroup label="Reps" value={exercise.reps} onChange={(e) => handleInputChange(e, index, 'reps')} />
                <InputGroup label="Weight (kg)" value={exercise.weight} onChange={(e) => handleInputChange(e, index, 'weight')} />
            </div>
             <div className="mt-4">
                 <label className="block text-xs font-medium text-slate-600">Notes</label>
                 <textarea
                     value={exercise.notes}
                     onChange={(e) => handleInputChange(e, index, 'notes')}
                     rows={2}
                     className="mt-1 block w-full text-sm px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-md"
                     placeholder="e.g. Focus on form"
                 />
            </div>
          </div>
        ))}
         {workout.exercises.length === 0 && (
            <p className="text-center text-slate-500 py-4">No exercises added yet. Start by adding one below!</p>
        )}
      </div>

       <div className="mt-6">
        <button
            onClick={handleAddExercise}
            className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-600 px-4 py-2 rounded-md text-sm font-semibold hover:bg-slate-200 transition-colors"
        >
            <Icon name="plus" className="w-4 h-4" />
            Add Exercise
        </button>
      </div>
    </div>
  );
};

interface InputGroupProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputGroup: React.FC<InputGroupProps> = ({ label, value, onChange }) => (
    <div>
        <label className="block text-xs font-medium text-slate-600">{label}</label>
        <input
            type="text"
            value={value}
            onChange={onChange}
            className="mt-1 block w-full text-sm px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-md"
        />
    </div>
);


export default WorkoutCard;