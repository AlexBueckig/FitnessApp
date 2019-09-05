import AsyncStorage from '@react-native-community/async-storage';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const useCurrentWorkout = () => {
  /**
   * Workoutformat:
   *  {
   *    <exercise>: [{reps, rep-unit, weight, weight-unit}, ...]
   *  }
   */
  const [currentWorkout, setCurrentWorkout] = useState({});

  useEffect(() => {
    const getCurrentWorkout = async () => {
      const day = await AsyncStorage.getItem('currentWorkoutDay');
      if (day && day === dayjs().format('YYYY-MM-DD')) {
        const workout = await AsyncStorage.getItem('currentWorkout');
        if (workout) {
          try {
            setCurrentWorkout(JSON.parse(workout));
          } catch (error) {
            console.log(error);
          }
        }
      }
    };

    getCurrentWorkout();
  }, []);

  useEffect(() => {
    try {
      AsyncStorage.setItem('currentWorkoutDay', dayjs().format('YYYY-MM-DD'));
      AsyncStorage.setItem('currentWorkout', JSON.stringify(currentWorkout));
    } catch (error) {
      console.log(error);
    }
  }, [currentWorkout]);

  return [currentWorkout, setCurrentWorkout];
};

export default useCurrentWorkout;
