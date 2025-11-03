// FIX: Implement the useWeeklyData hook to provide initial data and state management.
import { useState, useEffect, useRef, useCallback } from 'react';
import { Day, Meals } from '../types';

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
    // Day 1
    {
        EarlyMorning: [{ id: 'em1', name: 'Handful of almonds & walnuts' }],
        breakfast: [{ id: 'b1', name: 'Oats with milk and nuts' }],
        lunch: [{ id: 'l1', name: 'Roti/Rice, Dal, Vegetable Curry' }, { id: 'l2', name: 'Salad, Curd, Chicken/Fish' }],
        snacks: [{ id: 's1', name: 'Fruit chaat' }],
        dinner: [{ id: 'd1', name: 'Roti/Rice, Paneer Curry, Salad' }],
        LateNight: [{ id: 'ln1', name: 'Glass of milk with turmeric' }],
    },
    // Day 2
    {
        EarlyMorning: [{ id: 'em2', name: 'Soaked raisins' }],
        breakfast: [{ id: 'b2', name: '2 Paneer Parathas with curd' }],
        lunch: [{ id: 'l3', name: '1 bowl of Dal, 1 bowl of vegetable curry' }, { id: 'l4', name: '2 Rotis/1 bowl of Rice, Salad' }],
        snacks: [{ id: 's2', name: 'Sprouts salad' }],
        dinner: [{ id: 'd2', name: '1 bowl of seasonal vegetables, 2 Rotis' }, {id: 'd3', name: 'Tofu curry'}],
        LateNight: [{ id: 'ln2', name: 'Handful of sunflower seeds' }],
    },
    // Day 3
    {
        EarlyMorning: [{ id: 'em3', name: 'Handful of mixed nuts' }],
        breakfast: [{ id: 'b3', name: 'Eggs with whole wheat bread' }],
        lunch: [{ id: 'l5', name: 'Roti/Rice, Dal, Mixed Veggies' }, { id: 'l6', name: 'Salad, Curd' }],
        snacks: [{ id: 's3', name: 'Lassi or Coconut water' }],
        dinner: [{ id: 'd4', name: 'Roti/Rice, Chickpea Curry, Salad' }],
        LateNight: [{ id: 'ln3', name: 'Glass of milk' }],
    },
    // Day 4
    {
        EarlyMorning: [{ id: 'em4', name: 'Handful of walnuts' }],
        breakfast: [{ id: 'b4', name: 'Banana shake with nuts' }],
        lunch: [{ id: 'l7', name: 'Chicken/Fish curry, Rice, Salad' }],
        snacks: [{ id: 's4', name: 'Roasted chana' }],
        dinner: [{ id: 'd5', name: 'Roti, Mixed vegetable curry' }],
        LateNight: [{ id: 'ln4', name: 'Handful of pumpkin seeds' }],
    },
    // Day 5
    {
        EarlyMorning: [{ id: 'em5', name: 'Soaked almonds' }],
        breakfast: [{ id: 'b5', name: 'Oats with milk and fruits' }],
        lunch: [{ id: 'l8', name: 'Paneer curry, Roti/Rice, Salad' }],
        snacks: [{ id: 's5', name: 'Peanut butter sandwich' }],
        dinner: [{ id: 'd6', name: 'Dal, Rice, Green veggies' }],
        LateNight: [{ id: 'ln5', name: 'Glass of warm milk' }],
    },
    // Day 6
    {
        EarlyMorning: [{ id: 'em6', name: 'Handful of cashews' }],
        breakfast: [{ id: 'b6', name: 'Vegetable Poha' }],
        lunch: [{ id: 'l9', name: 'Roti, Black bean curry, Curd' }],
        snacks: [{ id: 's6', name: 'Sweet potato chaat' }],
        dinner: [{ id: 'd7', name: 'Mixed veg paratha with butter' }],
        LateNight: [{ id: 'ln6', name: 'Handful of mixed seeds' }],
    },
    // Day 7
    {
        EarlyMorning: [{ id: 'em7', name: 'Handful of mixed nuts & seeds' }],
        breakfast: [{ id: 'b7', name: 'Moong Dal Cheela' }],
        lunch: [{ id: 'l10', name: 'Rajma Chawal, Salad, Curd' }],
        snacks: [{ id: 's7', name: 'Vegetable soup' }],
        dinner: [{ id: 'd8', name: 'Soya chunks curry, Roti' }],
        LateNight: [{ id: 'ln7', name: 'Glass of milk' }],
    }
];


const getInitialWeeklyData = (startDate: Date): Day[] => {
    const weekData: Day[] = [];
    
    for (let i = 0; i < 7; i++) {
        const date = addDays(startDate, i);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const dayOfMonth = date.getDate().toString().padStart(2, '0');
        const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });

        let workout: Day['workout'] = null;
        if (i === 1 || i === 3 || i === 5) { // Mon, Wed, Fri
             workout = {
                id: `w${i}`,
                category: i === 1 ? 'Upper Body' : i === 3 ? 'Lower Body' : 'Full Body',
                exercises: [
                    { id: `e${i}-1`, name: i === 3 ? 'Squats' : 'Bench Press', sets: '3', reps: '10', weight: '60', notes: '', completed: false },
                    { id: `e${i}-2`, name: i === 3 ? 'Deadlifts' : 'Overhead Press', sets: '3', reps: '8', weight: '40', notes: '', completed: false },
                ]
             };
        }

        weekData.push({
            date: `${year}-${month}-${dayOfMonth}`,
            dayOfWeek: dayOfWeek,
            weight: null,
            calorieTarget: 2800,
            caloriesConsumed: null,
            proteinTarget: 100,
            proteinConsumed: null,
            meals: mealPlans[i % mealPlans.length],
            workout: workout,
        });
    }
    return weekData;
};

const LOCAL_STORAGE_KEY_PREFIX = 'fitness-tracker-week-';

const useWeeklyData = (weekStartDate: Date) => {
  const [weeklyData, _setWeeklyData] = useState<Day[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const weekStartDateRef = useRef(weekStartDate);

  const setWeeklyData = useCallback((dataOrFn: React.SetStateAction<Day[]>) => {
    _setWeeklyData(prevData => {
        const newData = typeof dataOrFn === 'function' ? dataOrFn(prevData) : dataOrFn;
        if (newData && newData.length > 0) {
            const key = `${LOCAL_STORAGE_KEY_PREFIX}${weekStartDateRef.current.toISOString().split('T')[0]}`;
            try {
                localStorage.setItem(key, JSON.stringify(newData));
            } catch (error) {
                console.error("Failed to save to localStorage", error);
            }
        }
        return newData;
    });
  }, []);

  useEffect(() => {
    weekStartDateRef.current = weekStartDate;
    setIsLoading(true);

    const key = `${LOCAL_STORAGE_KEY_PREFIX}${weekStartDate.toISOString().split('T')[0]}`;
    let data;
    try {
        const storedData = localStorage.getItem(key);
        if (storedData) {
            data = JSON.parse(storedData);
        }
    } catch (error) {
        console.error("Failed to load from localStorage", error);
    }
    
    if (data) {
        _setWeeklyData(data);
    } else {
        const prevWeekStartDate = addDays(weekStartDate, -7);
        const prevWeekKey = `${LOCAL_STORAGE_KEY_PREFIX}${prevWeekStartDate.toISOString().split('T')[0]}`;
        let templateData: Day[] | null = null;
        try {
            const storedTemplate = localStorage.getItem(prevWeekKey);
            if (storedTemplate) {
                templateData = JSON.parse(storedTemplate);
            }
        } catch (error) {
            console.error("Failed to load template from localStorage", error);
        }

        const baseTemplate = templateData || getInitialWeeklyData(weekStartDate);
        
        const newWeekData = baseTemplate.map((templateDay, i) => {
            const date = addDays(weekStartDate, i);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const dayOfMonth = date.getDate().toString().padStart(2, '0');
            
            return {
                ...templateDay,
                date: `${year}-${month}-${dayOfMonth}`,
                dayOfWeek: date.toLocaleString('en-US', { weekday: 'long' }),
                weight: null,
                caloriesConsumed: null,
                proteinConsumed: null,
                workout: templateDay.workout ? {
                    ...templateDay.workout,
                    exercises: templateDay.workout.exercises.map(ex => ({ ...ex, completed: false }))
                } : null,
            };
        });
        
        // This is a special case for the very first load ever to populate today's data.
        const today = new Date();
        const todayWeekStart = getWeekStartDate(today);
        if (weekStartDate.getTime() === todayWeekStart.getTime() && !templateData) {
            const todayIndex = today.getDay();
            if(newWeekData[todayIndex]) {
                newWeekData[todayIndex].weight = 60;
                newWeekData[todayIndex].caloriesConsumed = 1850;
                newWeekData[todayIndex].proteinConsumed = 60;
                if(newWeekData[todayIndex].workout && newWeekData[todayIndex].workout!.exercises.length > 0) {
                    newWeekData[todayIndex].workout!.exercises[0].completed = true;
                }
            }
        }

        _setWeeklyData(newWeekData);
         try {
            localStorage.setItem(key, JSON.stringify(newWeekData));
        } catch (error) {
            console.error("Failed to save new week to localStorage", error);
        }
    }

    setIsLoading(false);
  }, [weekStartDate]);

  const updateDay = (dayIndex: number, updatedDay: Day) => {
    const newWeeklyData = [...weeklyData];
    newWeeklyData[dayIndex] = updatedDay;
    setWeeklyData(newWeeklyData);
  };

  return { weeklyData, updateDay, setWeeklyData, isLoading };
};

export default useWeeklyData;