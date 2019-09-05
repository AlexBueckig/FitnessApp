import { useEffect, useState } from 'react';
import Day from '../watermelondb/models/Day';

const useWorkoutNameForDay = (day: Day) => {
  const [workoutName, setWorkoutName] = useState('');

  useEffect(() => {
    const getWorkout = async () => {
      const workout = await day.workout.fetch();
      setWorkoutName(workout.name);
    };

    getWorkout();
  }, []);

  return workoutName;
};

export default useWorkoutNameForDay;
