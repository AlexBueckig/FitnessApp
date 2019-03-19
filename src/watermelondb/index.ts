import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import React, { createContext } from 'react';
import Day from './models/Day';
import Exercise from './models/Exercise';
import Set from './models/Set';
import SetExercises from './models/SetExercises';
import Workout from './models/Workout';
import schema from './schema';

const adapter = new SQLiteAdapter({ schema });

const database = new Database({
  adapter,
  modelClasses: [Exercise, Workout, Day, Set, SetExercises]
});

export class RootModel {
  static createExercise = async (
    name: string = '',
    description: string = '',
    category: string = '',
    muscles: number[] = []
  ) => {
    const exerciseCollection = await database.collections.get<Exercise>('exercises');
    return await database.action(async () => {
      const newExercise = await exerciseCollection.create(exercise => {
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
    return await database.action(async () => {
      const newWorkout = await workoutCollection.create(workout => {
        workout.name = name;
        workout.active = active;
      });
      return newWorkout;
    }, 'Add Workout Action');
  };
}

const { Provider: ModelProvider, Consumer: ModelConsumer }: React.Context<typeof RootModel> = createContext(RootModel);

export { ModelProvider, ModelConsumer };

export default database;
