import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MetricMintLanding from './MetricMintLanding';
import HabitTrackerLanding from './HabitTrackerLanding';
import GoalTrackerLanding from './GoalTrackerLanding';

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-400 font-mono text-sm uppercase tracking-widest">Loading...</div>}>
      <Routes>
        <Route path="/" element={<MetricMintLanding />} />
        <Route path="/habit-tracker/*" element={<HabitTrackerLanding />} />
        <Route path="/habit-tracker" element={<HabitTrackerLanding />} />
        <Route path="/goal-tracker/*" element={<GoalTrackerLanding />} />
        <Route path="/goal-tracker" element={<GoalTrackerLanding />} />
        {/* Catch-all for unknown routes */}
        <Route path="*" element={<MetricMintLanding />} />
      </Routes>
    </Suspense>
  );
}
