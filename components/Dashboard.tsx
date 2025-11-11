
import React, { useState, useEffect } from 'react';
// FIX: Import MealItem for type annotation
import { Day, MealItem, UserProfile } from '../types';
import WeightChart from './WeightChart';
import CaloriesChart from './CaloriesChart';
import ProteinChart from './ProteinChart';
import PrinciplesCard from './PrinciplesCard';
import { Icon } from './Icon';
// FIX: Import IconName for type annotation
import type { IconName } from './Icon';

interface DashboardProps {
  weeklyData: Day[];
  userProfile: UserProfile;
  onSelectDay: (index: number) => void;
  calorieTarget: number;
  onUpdateCalorieTarget: (target: number) => void;
  proteinTarget: number;
  onUpdateProteinTarget: (target: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ weeklyData, userProfile, onSelectDay, calorieTarget, onUpdateCalorieTarget, proteinTarget, onUpdateProteinTarget }) => {
  const totalWorkouts = weeklyData.filter(d => d.workout).length;
  const completedWorkouts = weeklyData.reduce((acc, day) => {
    if (day.workout && day.workout.exercises.every(ex => ex.completed)) {
      return acc + 1;
    }
    return acc;
  }, 0);
  const workoutCompletion = totalWorkouts > 0 ? Math.round((completedWorkouts / totalWorkouts) * 100) : 0;
  
  const currentWeight = [...weeklyData].reverse().find(d => d.weight !== null)?.weight;

  const caloriesData = weeklyData.map(day => ({
    name: day.dayOfWeek.substring(0, 3),
    target: day.calorieTarget,
    consumed: day.caloriesConsumed ?? 0,
  }));
  
  const proteinData = weeklyData.map(day => ({
    name: day.dayOfWeek.substring(0, 3),
    target: day.proteinTarget,
    consumed: day.proteinConsumed ?? 0,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Weekly Dashboard</h2>
        <p className="text-slate-500 mt-1">Your progress summary for the week.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Current Weight" value={currentWeight ? `${currentWeight} kg` : 'N/A'} iconName="scale" color="text-blue-500" />
        <StatCard title="Height" value={`${userProfile.height} cm`} iconName="arrowsUpDown" color="text-violet-500" />
        <StatCard title="Workout Completion" value={`${workoutCompletion}%`} iconName="checkCircle" color="text-green-500" />
        <StatCard title="Workouts Planned" value={`${totalWorkouts}`} iconName="calendar" color="text-indigo-500" />
        <StatCard title="Workouts Done" value={`${completedWorkouts}`} iconName="award" color="text-amber-500" />
        <EditableStatCard 
            title="Daily Calorie Target" 
            value={calorieTarget} 
            onSave={onUpdateCalorieTarget} 
            iconName="flame" 
            color="text-orange-500" 
        />
         <EditableStatCard 
            title="Daily Protein Target (g)" 
            value={proteinTarget} 
            onSave={onUpdateProteinTarget} 
            iconName="steak" 
            color="text-red-500" 
        />
      </div>

      <PrinciplesCard />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Weight Trend</h3>
          <WeightChart data={weeklyData} />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Calories: Target vs. Consumed</h3>
          <CaloriesChart data={caloriesData} />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Protein: Target vs. Consumed</h3>
          <ProteinChart data={proteinData} />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Daily Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
          {weeklyData.map((day, index) => (
            <DayCard key={index} day={day} onClick={() => onSelectDay(index)} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
    title: string;
    value: string;
    // FIX: Use specific IconName type for better type safety.
    iconName: IconName;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, iconName, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
        <div className={`p-3 rounded-full bg-slate-100 ${color}`}>
            <Icon name={iconName} className="w-6 h-6" />
        </div>
        <div>
            <p className="text-slate-500 text-sm">{title}</p>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
        </div>
    </div>
);

interface EditableStatCardProps {
    title: string;
    value: number;
    iconName: IconName;
    color: string;
    onSave: (newValue: number) => void;
}

const EditableStatCard: React.FC<EditableStatCardProps> = ({ title, value, iconName, color, onSave }) => {
    const [currentValue, setCurrentValue] = useState(value.toString());
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (!isEditing) {
            setCurrentValue(value.toString());
        }
    }, [value, isEditing]);

    const handleBlur = () => {
        setIsEditing(false);
        const numValue = parseInt(currentValue, 10);
        if (!isNaN(numValue) && numValue !== value) {
            onSave(numValue);
        } else {
            setCurrentValue(value.toString());
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
            <div className={`p-3 rounded-full bg-slate-100 ${color}`}>
                <Icon name={iconName} className="w-6 h-6" />
            </div>
            <div>
                <p className="text-slate-500 text-sm">{title}</p>
                 <input
                    type="number"
                    value={currentValue}
                    onChange={(e) => setCurrentValue(e.target.value)}
                    onBlur={handleBlur}
                    onFocus={() => setIsEditing(true)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.target as HTMLInputElement).blur()}
                    className="text-2xl font-bold text-slate-900 bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-md w-28 -ml-1 p-1"
                    aria-label={`Edit ${title}`}
                />
            </div>
        </div>
    );
};


interface DayCardProps {
    day: Day;
    onClick: () => void;
}

const DayCard: React.FC<DayCardProps> = ({ day, onClick }) => {
    const consumedCalories = day.caloriesConsumed ?? 0;
    const consumedProtein = day.proteinConsumed ?? 0;
    const hasWorkout = !!day.workout;
    const isWorkoutCompleted = hasWorkout && day.workout.exercises.every(e => e.completed);

    const getTodayString = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const date = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${date}`;
    };

    const todayString = getTodayString();
    const isToday = day.date === todayString;
    const isFuture = day.date > todayString;


    return (
        <button onClick={onClick} className="relative bg-white p-4 rounded-xl shadow-md text-left hover:ring-2 hover:ring-blue-500 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500">
            {isToday && <span className="absolute top-2 right-2 text-xs bg-green-100 text-green-800 font-semibold px-2 py-0.5 rounded-full">Today</span>}
            {isFuture && <span className="absolute top-2 right-2 text-xs bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded-full">Upcoming</span>}
            
            <p className="font-bold text-slate-800">{day.dayOfWeek}</p>
            <p className="text-sm text-slate-500">{new Date(day.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
            <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                    <Icon name="scale" className="w-4 h-4 text-blue-500" />
                    <span>{day.weight ? `${day.weight} kg` : 'N/A'}</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Icon name="flame" className="w-4 h-4 text-orange-500" />
                    <span>{consumedCalories} / {day.calorieTarget} kcal</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Icon name="steak" className="w-4 h-4 text-red-500" />
                    <span>{consumedProtein} / {day.proteinTarget} g</span>
                </div>
                {hasWorkout && (
                    <div className={`flex items-center gap-2 ${isWorkoutCompleted ? 'text-green-500' : 'text-slate-500'}`}>
                        <Icon name={isWorkoutCompleted ? 'checkCircle' : 'dumbbell'} className="w-4 h-4" />
                        <span>{day.workout?.category}</span>
                    </div>
                )}
            </div>
        </button>
    )
}

export default Dashboard;
