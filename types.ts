// FIX: Define all necessary types for the application.
export interface MealItem {
  id: string;
  name: string;
}

export type MealType = 'EarlyMorning' | 'breakfast' | 'lunch' | 'dinner' | 'snacks' | 'LateNight';

export type Meals = Record<MealType, MealItem[]>;

export interface Exercise {
  id: string;
  name: string;
  sets: string;
  reps: string;
  weight: string;
  notes: string;
  completed: boolean;
}

export interface Workout {
  id:string;
  category: string;
  exercises: Exercise[];
}

export interface Day {
  date: string; // YYYY-MM-DD
  dayOfWeek: string;
  weight: number | null;
  caloriesConsumed: number | null;
  calorieTarget: number;
  proteinConsumed: number | null;
  proteinTarget: number;
  meals: Meals;
  workout: Workout | null;
}

export interface UserProfile {
  height: number;
}