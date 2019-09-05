import dayjs from 'dayjs';
import Day from '../watermelondb/models/Day';
import Exercise from '../watermelondb/models/Exercise';

const getExercisesByCategory = (exercises: Exercise[]) => {
  const processedExercises: { [key: string]: Exercise[] } = {};
  exercises.map(exercise => {
    if (!processedExercises[exercise.category]) {
      processedExercises[exercise.category] = [];
    }
    processedExercises[exercise.category].push(exercise);
  });
  return Object.entries(processedExercises).map(([key, value]) => ({ title: key, data: value }));
};

const getDaysByWeekday = (days: Day[]) => {
  const sortedDays: { [key: string]: Day[] } = {};

  for (const day of days) {
    for (const weekday of day.days) {
      if (!sortedDays[weekday]) {
        sortedDays[weekday] = [];
      }
      sortedDays[weekday].push(day);
    }
  }

  const sortedDaysArr = Object.entries(sortedDays).map(([key, value]) => ({ day: key, data: value }));

  // convert Array<{key, values[]}> to Array<{key, value}>
  const returnArray = [];
  for (const item of sortedDaysArr) {
    for (const day of item.data) {
      returnArray.push({ weekday: item.day, day });
    }
  }

  // sort by current day of week (today = first element in array)
  const today = dayjs().day();
  returnArray.sort((a, b) => {
    const newA = (+a.weekday + 7 - today) % 7;
    const newB = (+b.weekday + 7 - today) % 7;

    return newA - newB;
  });

  return returnArray;
};

export { getExercisesByCategory, getDaysByWeekday };
