import fs from 'fs';

let landing = fs.readFileSync('src/HabitTrackerLanding.tsx', 'utf-8');
landing = landing.replace(/HabitTrackerLanding/g, 'GoalTrackerLanding');
landing = landing.replace(/Habit Tracker/g, 'Goal Planner');
landing = landing.replace(/HABIT TRACKER/g, 'GOAL PLANNER');
landing = landing.replace(/habit tracker/g, 'goal planner');
landing = landing.replace(/InteractiveDemo/g, 'GoalTrackerDemo');
landing = landing.replace(/habits/g, 'goals');
landing = landing.replace(/habit/g, 'goal');
landing = landing.replace(/Habit/g, 'Goal');
landing = landing.replace(/HABIT/g, 'GOAL');
fs.writeFileSync('src/GoalTrackerLanding.tsx', landing);

let demo = fs.readFileSync('src/components/InteractiveDemo.tsx', 'utf-8');
demo = demo.replace(/InteractiveDemo/g, 'GoalTrackerDemo');
demo = demo.replace(/Habit Tracker/g, 'Goal Planner');
demo = demo.replace(/HABIT TRACKER/g, 'GOAL PLANNER');
demo = demo.replace(/habit tracker/g, 'goal planner');
demo = demo.replace(/habits/g, 'goals');
demo = demo.replace(/habit/g, 'goal');
demo = demo.replace(/Habit/g, 'Goal');
demo = demo.replace(/HABIT/g, 'GOAL');
demo = demo.replace(/INITIAL_HABITS/g, 'INITIAL_GOALS');
fs.writeFileSync('src/components/GoalTrackerDemo.tsx', demo);
