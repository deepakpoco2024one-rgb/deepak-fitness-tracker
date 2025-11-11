
interface ExerciseTemplate {
    name: string;
    sets: string;
    reps: string;
}

interface WorkoutTemplate {
    category: string;
    exercises: ExerciseTemplate[];
}

type WeeklyWorkoutTemplate = {
    [day: string]: WorkoutTemplate | undefined;
};

export const workoutPlan: WeeklyWorkoutTemplate[] = [
    // Week 1
    {
        'Monday': {
            category: 'Legs',
            exercises: [
                { name: 'Barbell squat (high bar/regular)', sets: '3', reps: '12' },
                { name: 'Leg press (two-foot placement)', sets: '2', reps: '15' },
                { name: 'Deadlift with dumbbells', sets: '3', reps: '8' },
                { name: 'Calf raise (with bar or chest support)', sets: '3', reps: '10' },
                { name: 'Jumping jacks', sets: '4', reps: '10' },
            ],
        },
        'Wednesday': {
            category: 'Chest, Biceps, Shoulders',
            exercises: [
                { name: 'Bench press with 2 sets of warming up', sets: '3', reps: '10' },
                { name: 'Dumbbell press (additional weight)', sets: '3', reps: '10' },
                { name: 'Incline dumbbell press', sets: '3', reps: '8' },
                { name: 'Proper bench press', sets: '3', reps: '15' },
                { name: 'Hammer curls', sets: '3', reps: '8' },
                { name: 'Overhead curl with cable', sets: '3', reps: '8' },
                { name: 'Standing grip swings', sets: '2', reps: '30' },
            ],
        },
        'Friday': {
            category: 'Back, Triceps',
            exercises: [
                { name: 'Deadlift (from or below knee)', sets: '3', reps: '10' },
                { name: 'Bent-over barbell row', sets: '2', reps: '10' },
                { name: 'Wide-grip lat pulldown', sets: '3', reps: '12' },
                { name: 'Dumbbell rows on bench', sets: '3', reps: '12' },
                { name: 'Dumbbell shrugs', sets: '3', reps: '12' },
                { name: 'Dumbbell extensions with cable machine', sets: '3', reps: '12' },
            ],
        },
        'Saturday': {
            category: 'ABS and Core',
            exercises: [
                { name: 'Leg raise on the floor', sets: '3', reps: '20' },
                { name: 'Russian twist with extra weight', sets: '3', reps: '20' },
                { name: 'Hyperextension with extra weight', sets: '3', reps: '10' },
                { name: 'Scissors for abs', sets: '3', reps: '40 sec' },
                { name: 'Plank', sets: '1', reps: 'Max' },
            ],
        },
    },
    // Week 2
    {
        'Monday': {
            category: 'Legs, Shoulders',
            exercises: [
                { name: 'Box squats', sets: '2', reps: '8' },
                { name: 'Barbell squat with pause at the bottom', sets: '2', reps: '7' },
                { name: 'Leg press with wide and high heel approach', sets: '4', reps: '12' },
                { name: 'Walking lunges with weight', sets: '3', reps: '10' },
                { name: 'Seated dumbbell lateral raises', sets: '3', reps: '15' },
                { name: 'Standing barbell shoulder press', sets: '3', reps: '8' },
            ],
        },
        'Wednesday': {
            category: 'Chest, Triceps',
            exercises: [
                { name: 'Incline bench press (30°)', sets: '3', reps: '10' },
                { name: 'Decline dumbbell press', sets: '3', reps: '10' },
                { name: 'Cable crossover', sets: '3', reps: '12' },
                { name: 'Close-grip bench press', sets: '3', reps: '8' },
                { name: 'Seated dumbbell French press', sets: '3', reps: '10' },
                { name: 'Wide push-ups', sets: '1', reps: 'Max' },
            ],
        },
        'Friday': {
            category: 'Back, Biceps',
            exercises: [
                { name: 'Bar deadlift (3-5 cm height)', sets: '3', reps: '8' },
                { name: 'Deadlift', sets: '2', reps: '3' },
                { name: 'Pull-ups (or pulldowns)', sets: '3', reps: '10' },
                { name: 'Dumbbell rows on bench in bent-over position', sets: '3', reps: '10' },
                { name: 'Seated dumbbell shrugs', sets: '3', reps: '10' },
                { name: 'Straight barbell curls', sets: '3', reps: '12' },
                { name: 'Reverse grip barbell curls', sets: '3', reps: '10' },
            ],
        },
        'Saturday': {
            category: 'ABS + Static',
            exercises: [
                { name: 'Hanging leg raises', sets: '3', reps: '12' },
                { name: 'Crunches', sets: '3', reps: '20' },
                { name: 'Alternating heel touches', sets: '3', reps: '15' },
                { name: 'Lying leg raises', sets: '3', reps: '20' },
                { name: 'Plank', sets: '2', reps: 'Max' },
            ],
        },
    },
    // Week 3
    {
        'Monday': {
            category: 'Legs',
            exercises: [
                { name: 'Barbell squat', sets: '4', reps: '6' },
                { name: 'Front squats', sets: '2', reps: '10' },
                { name: 'Deadlifts', sets: '3', reps: '10' },
                { name: 'Leg press with position of the heel on the top', sets: '3', reps: '8' },
                { name: 'Jumping jacks', sets: '3', reps: '10' },
            ],
        },
        'Wednesday': {
            category: 'Chest',
            exercises: [
                { name: 'Dumbbell bench press', sets: '3', reps: '8' },
                { name: 'Close-grip barbell bench', sets: '2', reps: '10' },
                { name: 'Triceps bar dips (weighted if possible)', sets: '3', reps: '8' },
                { name: 'Fly', sets: '4', reps: '12' },
                { name: 'Rise press', sets: '3', reps: '20' },
            ],
        },
        'Friday': {
            category: 'Back',
            exercises: [
                { name: 'Deadlifts', sets: '3', reps: '7' },
                { name: 'Rows pulls with the bar slightly beyond them', sets: '2', reps: '9' },
                { name: 'Seated cable rows', sets: '3', reps: '10' },
                { name: 'Wide-grip lat pulldowns', sets: '4', reps: '12' },
                { name: 'Straight arm pulldowns', sets: '4', reps: '12' },
            ],
        },
        'Saturday': {
            category: 'ABS + Static',
            exercises: [
                { name: 'Leg raise on the floor', sets: '3', reps: '12' },
                { name: 'Leg raises on parallel bars', sets: '3', reps: '12' },
                { name: 'Crunches (both knees and elbows, upper culture)', sets: '3', reps: '20' },
                { name: 'Chair pose', sets: '2', reps: 'Max' },
                { name: 'Plank', sets: '1', reps: 'Max' },
            ],
        },
    },
    // Week 4
    {
        'Monday': {
            category: 'Legs',
            exercises: [
                { name: 'Squats', sets: '3', reps: '8' },
                { name: 'Leg press (two-foot placement)', sets: '3', reps: '8' },
                { name: 'Deadlift with dumbbell', sets: '4', reps: '12' },
                { name: 'Front squats with dumbbell', sets: '3', reps: '8' },
                { name: 'Weighted hyperextensions', sets: '3', reps: '10' },
            ],
        },
        'Wednesday': {
            category: 'Bench Press',
            exercises: [
                { name: 'Bench press', sets: '5', reps: '5' },
                { name: 'Incline dumbbell press', sets: '3', reps: '10' },
                { name: 'Decline flies (30°)', sets: '3', reps: '8' },
                { name: 'Cable crossover', sets: '4', reps: '12' },
                { name: 'Dumbbell French press', sets: '3', reps: '12' },
                { name: 'Close grip bench press', sets: '3', reps: '5' },
            ],
        },
        'Friday': {
            category: 'Back and Biceps',
            exercises: [
                { name: 'Deadlift', sets: '5', reps: '8' },
                { name: 'Pull-ups (or pulldowns)', sets: '4', reps: '8' },
                { name: 'Horizontal cable rows', sets: '4', reps: '10' },
                { name: 'Reverse barbell rows', sets: '3', reps: '10' },
                { name: 'Reverse barbell curls', sets: '3', reps: '10' },
            ],
        },
        'Saturday': {
            category: 'ABS + Static Holds',
            exercises: [
                { name: 'Knee raises on a pull-up bar', sets: '3', reps: '10' },
                { name: 'Hanging leg raises', sets: '3', reps: '10' },
                { name: 'Alternating heel touches', sets: '3', reps: '15' },
                { name: 'Scissors while lying down', sets: '3', reps: '25' },
                { name: 'Plank', sets: '2', reps: 'Max' },
            ],
        },
    },
    // Week 5
    {
        'Monday': {
            category: 'Legs',
            exercises: [
                { name: 'Squats', sets: '4', reps: '4' },
                { name: 'Front squats', sets: '2', reps: '10' },
                { name: 'Leg press', sets: '3', reps: '10' },
                { name: 'High jumps', sets: '4', reps: '10' },
                { name: 'One-leg deadlifts (from floor with support)', sets: '3', reps: '10' },
            ],
        },
        'Wednesday': {
            category: 'Chest',
            exercises: [
                { name: 'Bench press', sets: '4', reps: '4' },
                { name: 'Bench press with a narrow grip', sets: '3', reps: '3' },
                { name: 'Dumbbell bench press with a neutral grip', sets: '3', reps: '12' },
                { name: 'Fly/low row', sets: '3', reps: '12' },
                { name: 'French press', sets: '2', reps: 'Max' },
            ],
        },
        'Friday': {
            category: 'Back and Legs',
            exercises: [
                { name: 'Deadlifts', sets: '5', reps: '3' },
                { name: 'Leg press', sets: '3', reps: '10' },
                { name: 'Calf raises with additional weight', sets: '5', reps: '8' },
                { name: 'Vertical jumps', sets: '3', reps: '10' },
            ],
        },
        'Saturday': {
            category: 'ABS + Static',
            exercises: [
                { name: 'Hanging leg raises with barbell (do not jerk)', sets: '3', reps: '8' },
                { name: 'Hanging leg raises with twist', sets: '3', reps: '12' },
                { name: 'Weighted crunches', sets: '3', reps: '15' },
                { name: 'Plank', sets: '2', reps: 'Max' },
            ],
        },
    },
    // Week 6
    {
        'Monday': {
            category: 'Legs',
            exercises: [
                { name: 'Squats', sets: '2', reps: '3' },
                { name: 'Deep leg presses', sets: '3', reps: '8' },
                { name: 'Leg press', sets: '3', reps: '10' },
                { name: 'Reverse squats (with weights in repetitions)', sets: '3', reps: '10' },
                { name: 'Burpees', sets: '1', reps: 'Max' },
            ],
        },
        'Wednesday': {
            category: 'Back + Biceps',
            exercises: [
                { name: 'Bent-over rows', sets: '3', reps: '7' },
                { name: 'Chin-ups with alternating elbows', sets: '3', reps: '7' },
                { name: 'Weighted pull-ups on a bottle/water bottle with a rope', sets: '4', reps: '10' },
                { name: 'Close-grip pull-ups', sets: '4', reps: '10' },
            ],
        },
        'Friday': {
            category: 'Chest + Triceps',
            exercises: [
                { name: 'Dips', sets: '4', reps: '7' },
                { name: 'Push-ups with a dumbbell/weight on the floor', sets: '4', reps: 'Max' },
                { name: 'Weighted push-ups on the floor', sets: '4', reps: '7' },
                { name: 'Triceps with additional weight (dumbbell/water bottle/rope)', sets: '4', reps: '8' },
                { name: 'Dumbbell curl with a rope', sets: '1', reps: 'Max' },
            ],
        },
        'Saturday': {
            category: 'ABS + Static Holds',
            exercises: [
                { name: 'Leg raise on the floor', sets: '3', reps: '8' },
                { name: 'Leg raises on parallel bars', sets: '3', reps: '8' },
                { name: 'Crunches', sets: '3', reps: '15' },
                { name: 'Plank', sets: '2', reps: 'Max' },
            ],
        },
    },
    // Week 7
    {
        'Monday': {
            category: 'Legs and Shoulders',
            exercises: [
                { name: 'Squats', sets: '2', reps: '2' },
                { name: 'Front squats', sets: '3', reps: '12' },
                { name: 'Deep leg press', sets: '3', reps: '15' },
                { name: 'Front squat with weight (if possible, in repetitions)', sets: '4', reps: '12' },
                { name: 'Standing dumbbell press', sets: '3', reps: '10' },
            ],
        },
        'Wednesday': {
            category: 'Chest and Triceps',
            exercises: [
                { name: 'Bench press', sets: '2', reps: '3' },
                { name: 'Incline dumbbell press', sets: '3', reps: '10' },
                { name: 'Dips', sets: '3', reps: '15' },
                { name: 'Dumbbell French press', sets: '3', reps: '12' },
                { name: 'Cable triceps extensions', sets: '4', reps: '12' },
            ],
        },
        'Friday': {
            category: 'Back and Biceps',
            exercises: [
                { name: 'Dumbbell Rows', sets: '2', reps: '3' },
                { name: 'Bent-over rows with alternating elbows', sets: '3', reps: '8' },
                { name: 'Bent-over barbell row', sets: '3', reps: '10' },
                { name: 'Pull-ups', sets: '3', reps: '10' },
                { name: 'Reverse grip barbell curls', sets: '3', reps: '10' },
                { name: 'Reverse curls on cable machine', sets: '3', reps: '10' },
            ],
        },
        'Saturday': {
            category: 'Sprints + Static Holds',
            exercises: [
                { name: '4 sprints (60 meters)', sets: '4', reps: 'Max' },
                { name: 'Plank 2 sets', sets: '2', reps: 'Max' },
            ],
        },
    },
    // Week 8
    {
        'Monday': {
            category: 'Legs and Shoulders',
            exercises: [
                { name: 'Squats (second)', sets: '1', reps: '1' },
                { name: 'Squats', sets: '2', reps: '12' },
                { name: 'Lunges', sets: '3', reps: '12' },
                { name: 'Calf raises with parallel support', sets: '4', reps: '12' },
                { name: 'Standing dumbbell press', sets: '3', reps: '10' },
            ],
        },
        'Wednesday': {
            category: 'Final Test of Strength',
            exercises: [
                { name: 'Pull-ups (with arms straight)', sets: '1', reps: 'Max' },
                { name: 'Rest for 10 minutes', sets: '', reps: '' },
                { name: 'Dips (on parallel bars)', sets: '1', reps: 'Max' },
                { name: 'Rest for 20 minutes', sets: '', reps: '' },
                { name: 'Push-ups (hands on the floor)', sets: '1', reps: 'Max' },
            ],
        },
        'Saturday': {
            category: 'Deadlift + Upper Body',
            exercises: [
                { name: 'Bent-over rows', sets: '1', reps: 'Max' },
                { name: 'Reverse-grip rows', sets: '3', reps: '8' },
                { name: 'Triceps extension on a pull-up bar', sets: '3', reps: '12' },
                { name: 'Triceps push-ups', sets: '3', reps: '12' },
                { name: 'Dumbbell French press on the bench', sets: '3', reps: '10' },
                { name: 'Diamond push-ups', sets: '1', reps: 'Max' },
            ],
        },
    },
];
