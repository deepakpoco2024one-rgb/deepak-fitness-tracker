
import React, { useState, useMemo } from 'react';
import useWeeklyData from './hooks/useWeeklyData';
import Dashboard from './components/Dashboard';
import DailyTracker from './components/DailyTracker';
import { Day, UserProfile } from './types';
import { Icon } from './components/Icon';
import { AuthProvider, useAuth } from './hooks/useAuth';
import LoginPage from './components/LoginPage';

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

const formatDateRange = (startDate: Date): string => {
    const endDate = addDays(startDate, 6);
    const startMonth = startDate.toLocaleDateString('en-US', { month: 'short' });
    const endMonth = endDate.toLocaleDateString('en-US', { month: 'short' });

    if (startMonth === endMonth) {
        return `${startMonth} ${startDate.getDate()} - ${endDate.getDate()}, ${startDate.getFullYear()}`;
    }
    return `${startMonth} ${startDate.getDate()} - ${endMonth} ${endDate.getDate()}, ${startDate.getFullYear()}`;
}


const FitnessTrackerApp: React.FC = () => {
  const { user, loading, signOut } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const weekStartDate = useMemo(() => getWeekStartDate(currentDate), [currentDate]);

  const { weeklyData, updateDay, setWeeklyData, isLoading } = useWeeklyData(weekStartDate, user);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    height: 177,
  });

  const calorieTarget = weeklyData?.[0]?.calorieTarget ?? 2800;
  const proteinTarget = weeklyData?.[0]?.proteinTarget ?? 100;

  const handleUpdateCalorieTarget = (target: number) => {
    setWeeklyData(prevData =>
        prevData.map(day => ({ ...day, calorieTarget: target }))
    );
  };

  const handleUpdateProteinTarget = (target: number) => {
    setWeeklyData(prevData =>
        prevData.map(day => ({ ...day, proteinTarget: target }))
    );
  };

  const handleSelectDay = (index: number) => {
    setSelectedDayIndex(index);
  };

  const handleBackToDashboard = () => {
    setSelectedDayIndex(null);
  };

  const handlePrevWeek = () => {
      setCurrentDate(prevDate => addDays(prevDate, -7));
      setSelectedDayIndex(null);
  };

  const handleNextWeek = () => {
      setCurrentDate(prevDate => addDays(prevDate, 7));
      setSelectedDayIndex(null);
  };
    
  const handleGoToToday = () => {
      setCurrentDate(new Date());
      setSelectedDayIndex(null);
  }

  const selectedDayData: Day | undefined = selectedDayIndex !== null ? weeklyData[selectedDayIndex] : undefined;

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading...</div>;
  }
  
  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 p-2 rounded-lg">
              <Icon name="dumbbell" className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Deepak's Fitness Tracker</h1>
          </div>
          <div className="flex items-center gap-4">
              <p className="text-sm text-slate-600 hidden sm:block">Welcome, {user.displayName}</p>
              <button onClick={signOut} className="px-3 py-1.5 text-sm font-semibold text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200">
                  Logout
              </button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-xl font-bold text-slate-700">{formatDateRange(weekStartDate)}</h2>
            <div className="flex items-center gap-2">
                <button onClick={handlePrevWeek} className="p-2 rounded-md bg-white border border-slate-300 hover:bg-slate-100 transition-colors shadow-sm">
                    <Icon name="arrowLeft" className="w-5 h-5" />
                </button>
                <button onClick={handleGoToToday} className="px-4 py-2 rounded-md bg-white border border-slate-300 hover:bg-slate-100 transition-colors text-sm font-semibold shadow-sm">
                    Today
                </button>
                <button onClick={handleNextWeek} className="p-2 rounded-md bg-white border border-slate-300 hover:bg-slate-100 transition-colors shadow-sm">
                    <Icon name="arrowRight" className="w-5 h-5" />
                </button>
            </div>
        </div>
        {(isLoading || loading) ? (
            <div className="text-center py-20 text-slate-500">
                <p>Loading your week...</p>
            </div>
        ) : selectedDayIndex === null || selectedDayData === undefined ? (
          <Dashboard
            weeklyData={weeklyData}
            userProfile={userProfile}
            onSelectDay={handleSelectDay}
            calorieTarget={calorieTarget}
            onUpdateCalorieTarget={handleUpdateCalorieTarget}
            proteinTarget={proteinTarget}
            onUpdateProteinTarget={handleUpdateProteinTarget}
          />
        ) : (
          <DailyTracker
            day={selectedDayData}
            dayIndex={selectedDayIndex}
            onUpdateDay={updateDay}
            onBack={handleBackToDashboard}
          />
        )}
      </main>
       <footer className="text-center p-4 text-slate-500 text-sm">
        <p>Built by Deepak and AI ;)</p>
      </footer>
    </div>
  );
};

const App: React.FC = () => (
    <AuthProvider>
        <FitnessTrackerApp />
    </AuthProvider>
);

export default App;