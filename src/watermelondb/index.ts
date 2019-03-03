import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import React, { createContext } from 'react';
import Exercise from './models/Exercise';
import schema from './schema';

const adapter = new SQLiteAdapter({ schema });

const database = new Database({
  adapter,
  modelClasses: [Exercise]
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

  /*   static createWorkout = async (name: string) => {
    const workoutCollection = await database.collections.get<Workout>('workouts');
    database.action(async () => {
      const newWorkout = await workoutCollection.create(workout => {
        workout.name = name;
      });
      return newWorkout;
    }, 'Add Workout Action');
  }; */
}

const { Provider: ModelProvider, Consumer: ModelConsumer }: React.Context<typeof RootModel> = createContext(RootModel);

export { ModelProvider, ModelConsumer };

export default database;
