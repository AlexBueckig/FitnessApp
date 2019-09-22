import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import Day from './models/Day';
import DayExercises from './models/DayExercises';
import Exercise from './models/Exercise';
import Workout from './models/Workout';
import Workoutlog from './models/Workoutlog';
import schema from './schema';

const adapter = new SQLiteAdapter({ dbName: 'watermelon', schema });

const database = new Database({
  adapter,
  modelClasses: [Exercise, Workout, Day, DayExercises, Workoutlog],
  actionsEnabled: true
});

export class RootModel {
  static createExercise = async (
    name: string = '',
    description: string = '',
    category: string = '',
    muscles: number[] = []
  ) => {
    const exerciseCollection = await database.collections.get<Exercise>('exercises');
    return await database.action<Exercise>(async () => {
      const newExercise = await exerciseCollection.create((exercise: Exercise) => {
        exercise.name = name;
        exercise.category = category;
        exercise.description = description;
        exercise.muscles = muscles;
      });
      return newExercise;
    }, 'Add Exercise Action');
  };

  static createWorkout = async (name: string, active: boolean = false) => {
    const workoutCollection = await database.collections.get<Workout>('workouts');
    return await database.action<Workout>(async () => {
      const newWorkout = await workoutCollection.create((workout: Workout) => {
        workout.name = name;
        workout.active = active;
      });
      return newWorkout;
    }, 'Add Workout Action');
  };

  static createLogEntry = async (reps: number, weight: number, exercise: Exercise, trainingDay: string) => {
    console.log(reps, weight);
    const workoutLogCollection = await database.collections.get<Workoutlog>('workoutlog');
    return await database.action<Workoutlog>(async () => {
      const newLogEntry = await workoutLogCollection.create((log: Workoutlog) => {
        log.reps = reps;
        log.weight = weight;
        log.exercise.set(exercise);
        log.trainingDay = trainingDay;
      });
      return newLogEntry;
    }, 'Add WorkoutLog Action');
  };
}

export default database;
