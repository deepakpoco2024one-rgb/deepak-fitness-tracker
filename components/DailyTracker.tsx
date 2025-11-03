// FIX: Implement the DailyTracker component.
import React, { useState } from 'react';
import { Day, MealType, MealItem, Exercise, Workout } from '../types';
import MealCard from './MealCard';
import WorkoutCard from './WorkoutCard';
import { Icon } from './Icon';

interface DailyTrackerProps {
  day: Day;
  dayIndex: number;
  onUpdateDay: (dayIndex: number, updatedDay: Day) => void;
  onBack: () => void;
}

const DailyTracker: React.FC<DailyTrackerProps> = ({ day, dayIndex, onUpdateDay, onBack }) => {
    const [weight, setWeight] = useState(day.weight?.toString() || '');
    const [calories, setCalories] = useState(day.caloriesConsumed?.toString() || '');
    const [protein, setProtein] = useState(day.proteinConsumed?.toString() || '');
    
    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWeight(e.target.value);
    };

    const handleWeightBlur = () => {
        const newWeight = weight ? parseFloat(weight) : null;
        if (newWeight !== day.weight) {
            onUpdateDay(dayIndex, { ...day, weight: newWeight });
        }
    };
    
    const handleCaloriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCalories(e.target.value);
    };

    const handleCaloriesBlur = () => {
        const newCalories = calories ? parseInt(calories, 10) : null;
        if (newCalories !== day.caloriesConsumed) {
            onUpdateDay(dayIndex, { ...day, caloriesConsumed: newCalories });
        }
    };

    const handleProteinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProtein(e.target.value);
    };

    const handleProteinBlur = () => {
        const newProtein = protein ? parseInt(protein, 10) : null;
        if (newProtein !== day.proteinConsumed) {
            onUpdateDay(dayIndex, { ...day, proteinConsumed: newProtein });
        }
    };

    const handleUpdateMeals = (mealType: MealType, updatedItems: MealItem[]) => {
        const updatedDay = {
            ...day,
            meals: {
                ...day.meals,
                [mealType]: updatedItems,
            },
        };
        onUpdateDay(dayIndex, updatedDay);
    };

    const handleWorkoutUpdate = (updatedWorkout: Workout | null) => {
        const updatedDay = { ...day, workout: updatedWorkout };
        onUpdateDay(dayIndex, updatedDay);
    };

    const handleAddWorkout = () => {
        const newWorkout: Workout = {
            id: `w-${Date.now()}`,
            category: 'New Workout',
            exercises: [],
        };
        handleWorkoutUpdate(newWorkout);
    };

    return (
        <div className="space-y-8">
            <div>
                <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 font-semibold">
                    <Icon name="arrowLeft" className="w-5 h-5" />
                    Back to Dashboard
                </button>
                <h2 className="text-3xl font-bold text-slate-900">{day.dayOfWeek}'s Log</h2>
                <p className="text-slate-500 mt-1">{new Date(day.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                     <h3 className="text-lg font-semibold mb-4">Today's Vitals</h3>
                     <div className="space-y-4">
                        <div>
                           <label htmlFor="weight" className="block text-sm font-medium text-slate-700">Weight (kg)</label>
                           <input 
                            id="weight"
                            type="number"
                            value={weight}
                            onChange={handleWeightChange}
                            onBlur={handleWeightBlur}
                            placeholder="Enter weight"
                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                           />
                        </div>
                         <div>
                           <label htmlFor="calories" className="block text-sm font-medium text-slate-700">Calories Consumed</label>
                           <input 
                            id="calories"
                            type="number"
                            value={calories}
                            onChange={handleCaloriesChange}
                            onBlur={handleCaloriesBlur}
                            placeholder="Enter calories"
                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                           />
                        </div>
                        <div>
                           <label htmlFor="protein" className="block text-sm font-medium text-slate-700">Protein Consumed (g)</label>
                           <input 
                            id="protein"
                            type="number"
                            value={protein}
                            onChange={handleProteinChange}
                            onBlur={handleProteinBlur}
                            placeholder="Enter protein"
                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                           />
                        </div>
                     </div>
                </div>
                 <div className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-center">
                    <h3 className="text-lg font-semibold mb-2">Calorie Intake</h3>
                    <p className="text-4xl font-bold text-blue-600">{day.caloriesConsumed ?? 0}</p>
                    <p className="text-slate-500">Target: {day.calorieTarget} kcal</p>
                </div>
                 <div className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-center">
                    <h3 className="text-lg font-semibold mb-2">Protein Intake</h3>
                    <p className="text-4xl font-bold text-red-600">{day.proteinConsumed ?? 0} g</p>
                    <p className="text-slate-500">Target: {day.proteinTarget} g</p>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold mb-4">Meal Suggestions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <MealCard title="Early Morning" mealType="EarlyMorning" items={day.meals.EarlyMorning} onUpdate={handleUpdateMeals} />
                    <MealCard title="Breakfast" mealType="breakfast" items={day.meals.breakfast} onUpdate={handleUpdateMeals} />
                    <MealCard title="Lunch" mealType="lunch" items={day.meals.lunch} onUpdate={handleUpdateMeals} />
                    <MealCard title="Snacks" mealType="snacks" items={day.meals.snacks} onUpdate={handleUpdateMeals} />
                    <MealCard title="Dinner" mealType="dinner" items={day.meals.dinner} onUpdate={handleUpdateMeals} />
                    <MealCard title="Late Night" mealType="LateNight" items={day.meals.LateNight} onUpdate={handleUpdateMeals} />
                </div>
            </div>
            
            <div>
                <h3 className="text-xl font-semibold mb-4">Workout</h3>
                {day.workout ? (
                     <WorkoutCard workout={day.workout} onUpdate={handleWorkoutUpdate} />
                ) : (
                    <div className="bg-white p-6 rounded-xl shadow-md text-center">
                        <h4 className="font-semibold text-slate-800">No Workout Today</h4>
                        <p className="text-sm text-slate-500 mb-4">Ready to get started?</p>
                        <button 
                            onClick={handleAddWorkout}
                            className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-600 transition"
                        >
                            <Icon name="plus" className="w-4 h-4" />
                            Add Workout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DailyTracker;