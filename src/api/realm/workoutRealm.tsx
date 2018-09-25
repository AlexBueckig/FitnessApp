import { Alert } from 'react-native';
import Realm from 'realm';
import { IDay } from '../../types/dayTypes';
import { IWorkout } from '../../types/workoutTypes';
import { SCHEMA_VERSION } from './';
import { Day, Exercise, Set, Setting, Workout } from './schemas/workout/WorkoutSchema';

export const getWorkouts = async () => {
  try {
    const realm = await Realm.open({
      schema: [Workout.schema, Day.schema, Set.schema, Setting.schema, Exercise.schema],
      schemaVersion: SCHEMA_VERSION
    });
    const workouts = JSON.parse(JSON.stringify(realm.objects('Workout')));
    const workoutsCopy: IWorkout[] = [];
    Object.keys(workouts).forEach(key => workoutsCopy.push(workouts[key]));
    realm.close();
    return { count: workoutsCopy.length, results: workoutsCopy };
  } catch (error) {
    console.log(error);
    Alert.alert(error);
    return error;
  }
};

export const saveWorkout = async (workout: IWorkout) => {
  try {
    const realm = await Realm.open({
      schema: [Workout.schema, Day.schema, Set.schema, Setting.schema, Exercise.schema],
      schemaVersion: SCHEMA_VERSION
    });
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
    realm.close();
    return workout;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteWorkout = async (id: number) => {
  try {
    const realm = await Realm.open({
      schema: [Workout.schema, Day.schema, Set.schema, Setting.schema, Exercise.schema],
      schemaVersion: SCHEMA_VERSION
    });
    const workout = realm.objects<Workout>(Workout.schema.name).filtered('id = ' + id);
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
    const workout: IWorkout = { id: 0, days: [], comment: '', creation_date: new Date() };
    if (id !== 0) {
      const realm = await Realm.open({
        schema: [Workout.schema, Day.schema, Set.schema, Setting.schema, Exercise.schema],
        schemaVersion: SCHEMA_VERSION
      });
      const workouts = JSON.parse(JSON.stringify(realm.objects<Workout>(Workout.schema.name).filtered('id = ' + id)));
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
