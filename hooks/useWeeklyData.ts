// FIX: Import firebase to use the 'firebase.User' type.
import firebase from 'firebase/compat/app';
import React, { useState, useEffect, useCallback } from 'react';
import { Day, Meals } from '../types';
import { workoutPlan } from '../data/workoutPlan';
import { db } from '../firebase';

const getWeekStartDate = (date: Date): Date => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
};

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const mealPlans: Meals[] = [
    // Meal plans remain the same
    { EarlyMorning: [{ id: 'em1', name: 'Handful of almonds & walnuts' }], breakfast: [{ id: 'b1', name: 'Oats with milk and nuts' }], lunch: [{ id: 'l1', name: 'Roti/Rice, Dal, Vegetable Curry' }, { id: 'l2', name: 'Salad, Curd, Chicken/Fish' }], snacks: [{ id: 's1', name: 'Fruit chaat' }], dinner: [{ id: 'd1', name: 'Roti/Rice, Paneer Curry, Salad' }], LateNight: [{ id: 'ln1', name: 'Glass of milk with turmeric' }], },
    { EarlyMorning: [{ id: 'em2', name: 'Soaked raisins' }], breakfast: [{ id: 'b2', name: '2 Paneer Parathas with curd' }], lunch: [{ id: 'l3', name: '1 bowl of Dal, 1 bowl of vegetable curry' }, { id: 'l4', name: '2 Rotis/1 bowl of Rice, Salad' }], snacks: [{ id: 's2', name: 'Sprouts salad' }], dinner: [{ id: 'd2', name: '1 bowl of seasonal vegetables, 2 Rotis' }, {id: 'd3', name: 'Tofu curry'}], LateNight: [{ id: 'ln2', name: 'Handful of sunflower seeds' }], },
    { EarlyMorning: [{ id: 'em3', name: 'Handful of mixed nuts' }], breakfast: [{ id: 'b3', name: 'Eggs with whole wheat bread' }], lunch: [{ id: 'l5', name: 'Roti/Rice, Dal, Mixed Veggies' }, { id: 'l6', name: 'Salad, Curd' }], snacks: [{ id: 's3', name: 'Lassi or Coconut water' }], dinner: [{ id: 'd4', name: 'Roti/Rice, Chickpea Curry, Salad' }], LateNight: [{ id: 'ln3', name: 'Glass of milk' }], },
    { EarlyMorning: [{ id: 'em4', name: 'Handful of walnuts' }], breakfast: [{ id: 'b4', name: 'Banana shake with nuts' }], lunch: [{ id: 'l7', name: 'Chicken/Fish curry, Rice, Salad' }], snacks: [{ id: 's4', name: 'Roasted chana' }], dinner: [{ id: 'd5', name: 'Roti, Mixed vegetable curry' }], LateNight: [{ id: 'ln4', name: 'Handful of pumpkin seeds' }], },
    { EarlyMorning: [{ id: 'em5', name: 'Soaked almonds' }], breakfast: [{ id: 'b5', name: 'Oats with milk and fruits' }], lunch: [{ id: 'l8', name: 'Paneer curry, Roti/Rice, Salad' }], snacks: [{ id: 's5', name: 'Peanut butter sandwich' }], dinner: [{ id: 'd6', name: 'Dal, Rice, Green veggies' }], LateNight: [{ id: 'ln5', name: 'Glass of warm milk' }], },
    { EarlyMorning: [{ id: 'em6', name: 'Handful of cashews' }], breakfast: [{ id: 'b6', name: 'Vegetable Poha' }], lunch: [{ id: 'l9', name: 'Roti, Black bean curry, Curd' }], snacks: [{ id: 's6', name: 'Sweet potato chaat' }], dinner: [{ id: 'd7', name: 'Mixed veg paratha with butter' }], LateNight: [{ id: 'ln6', name: 'Handful of mixed seeds' }], },
    { EarlyMorning: [{ id: 'em7', name: 'Handful of mixed nuts & seeds' }], breakfast: [{ id: 'b7', name: 'Moong Dal Cheela' }], lunch: [{ id: 'l10', name: 'Rajma Chawal, Salad, Curd' }], snacks: [{ id: 's7', name: 'Vegetable soup' }], dinner: [{ id: 'd8', name: 'Soya chunks curry, Roti' }], LateNight: [{ id: 'ln7', name: 'Glass of milk' }], }
];

const useWeeklyData = (weekStartDate: Date, user: firebase.User | null) => {
  const [weeklyData, setWeeklyDataState] = useState<Day[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getWeekDocRef = useCallback((date: Date) => {
    if (!user) return null;
    const dateString = date.toISOString().split('T')[0];
    return db.collection('users').doc(user.uid).collection('weeks').doc(dateString);
  }, [user]);

  const setWeeklyData = useCallback(async (dataOrFn: React.SetStateAction<Day[]>) => {
    const docRef = getWeekDocRef(weekStartDate);
    if (!docRef) return;

    setWeeklyDataState(prevData => {
        const newData = typeof dataOrFn === 'function' ? dataOrFn(prevData) : dataOrFn;
        if (newData && newData.length > 0) {
            // Firestore stores plain objects, not class instances
            docRef.set({ week: JSON.parse(JSON.stringify(newData)) }).catch(error => {
                console.error("Failed to save to Firestore", error);
            });
        }
        return newData;
    });
  }, [weekStartDate, getWeekDocRef]);
  
  useEffect(() => {
    if (!user) {
        setIsLoading(false);
        setWeeklyDataState([]);
        return;
    };

    setIsLoading(true);
    const docRef = getWeekDocRef(weekStartDate);
    if (!docRef) return;

    docRef.get().then(async (doc) => {
        if (doc.exists) {
            const data = doc.data();
            setWeeklyDataState(data?.week || []);
        } else {
            const userDocRef = db.collection('users').doc(user.uid);
            const userDoc = await userDocRef.get();
            let programStartDateStr = userDoc.data()?.programStartDate;

            if (!programStartDateStr) {
                programStartDateStr = getWeekStartDate(new Date()).toISOString();
                await userDocRef.set({ programStartDate: programStartDateStr }, { merge: true });
            }

            const programStartDate = new Date(programStartDateStr);
            const msInWeek = 7 * 24 * 60 * 60 * 1000;
            const weekDiff = Math.floor((weekStartDate.getTime() - programStartDate.getTime()) / msInWeek);
            
            const programWeekIndex = weekDiff % workoutPlan.length;
            const currentProgramWeekIndex = programWeekIndex < 0 ? workoutPlan.length + programWeekIndex : programWeekIndex;
            const weeklyWorkoutTemplate = workoutPlan[currentProgramWeekIndex];

            const prevWeekStartDate = addDays(weekStartDate, -7);
            const prevWeekDocRef = getWeekDocRef(prevWeekStartDate);
            let baseCalorieTarget = 2800;
            let baseProteinTarget = 100;
            if(prevWeekDocRef) {
                const prevWeekDoc = await prevWeekDocRef.get();
                if (prevWeekDoc.exists) {
                    const prevWeekData = prevWeekDoc.data()?.week;
                    if (prevWeekData && prevWeekData.length > 0) {
                        baseCalorieTarget = prevWeekData[0].calorieTarget;
                        baseProteinTarget = prevWeekData[0].proteinTarget;
                    }
                }
            }

            const newWeekData = Array.from({ length: 7 }, (_, i) => {
                const date = addDays(weekStartDate, i);
                const year = date.getFullYear();
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const dayOfMonth = date.getDate().toString().padStart(2, '0');
                const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });

                const workoutTemplate = weeklyWorkoutTemplate[dayOfWeek];
                
                const workout: Day['workout'] | null = workoutTemplate ? {
                    id: `w-${currentProgramWeekIndex}-${i}`,
                    category: workoutTemplate.category,
                    exercises: workoutTemplate.exercises.map((ex, exIdx) => ({
                        id: `e-${currentProgramWeekIndex}-${i}-${exIdx}`,
                        name: ex.name,
                        sets: ex.sets,
                        reps: ex.reps,
                        weight: '',
                        notes: '',
                        completed: false,
                    })),
                } : null;

                return {
                    date: `${year}-${month}-${dayOfMonth}`,
                    dayOfWeek,
                    weight: null,
                    calorieTarget: baseCalorieTarget,
                    caloriesConsumed: null,
                    proteinTarget: baseProteinTarget,
                    proteinConsumed: null,
                    meals: mealPlans[i % mealPlans.length],
                    workout,
                };
            });
            setWeeklyDataState(newWeekData);
            await docRef.set({ week: newWeekData });
        }
        setIsLoading(false);
    }).catch(error => {
        console.error("Error fetching weekly data from Firestore:", error);
        setIsLoading(false);
    });

  }, [weekStartDate, user, getWeekDocRef]);

  const updateDay = (dayIndex: number, updatedDay: Day) => {
    const newWeeklyData = [...weeklyData];
    newWeeklyData[dayIndex] = updatedDay;
    setWeeklyData(newWeeklyData);
  };

  return { weeklyData, updateDay, setWeeklyData, isLoading };
};

export default useWeeklyData;