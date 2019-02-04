import { Alert } from 'react-native';
import { IDay } from '../../types/dayTypes';
import { IWorkout } from '../../types/workoutTypes';
import realm, { schemas } from './schemas/';

export const getWorkouts = async () => {
  try {
    const workouts = JSON.parse(JSON.stringify(realm.objects('Workout')));
    const workoutsCopy: IWorkout[] = [];
    Object.keys(workouts).forEach(key => workoutsCopy.push(workouts[key]));
    return { count: workoutsCopy.length, results: workoutsCopy };
  } catch (error) {
    console.log(error);
    Alert.alert(error);
    return error;
  }
};

export const saveWorkout = async (workout: IWorkout) => {
  try {
    const { Workout } = schemas;
    const test = new Workout(workout.id, workout.comment, workout.creation_date, workout.days);
    if (workout.id === 0) {
      const maxId = Number(realm.objects('Workout').max('id')) + 1 || 1;
      test.id = maxId;
      realm.write(() => {
        realm.create(Workout.schema.name, test);
      });
    } else {
      realm.write(() => {
        realm.create(Workout.schema.name, workout, true);
      });
    }
    return workout;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteWorkout = async (id: number) => {
  try {
    const { Workout } = schemas;

    const workout = realm.objects<IWorkout>(Workout.schema.name).filtered('id = ' + id);
    realm.write(() => {
      realm.delete(workout);
    });
    return id;
  } catch (error) {
    return error;
  }
};

export const getWorkoutById = async (id: number) => {
  try {
    const { Workout } = schemas;
    const workout: IWorkout = { id: 0, days: [], comment: '', creation_date: new Date() };
    if (id !== 0) {
      const workouts = JSON.parse(JSON.stringify(realm.objects<IWorkout>(Workout.schema.name).filtered('id = ' + id)));
      const daysCopy: IDay[] = [];
      Object.keys(workouts).forEach(key => {
        Object.keys(workouts[key].days).forEach(day => {
          daysCopy.push(workouts[key].days[day]);
        });
        workout.id = workouts[key].id;
        workout.days = daysCopy;
        workout.comment = workouts[key].comment;
        workout.creation_date = workouts[key].creation_date;
      });
    }
    return workout;
  } catch (error) {
    return error;
  }
};

export default {
  saveWorkout,
  getWorkouts,
  deleteWorkout,
  getWorkoutById
};
