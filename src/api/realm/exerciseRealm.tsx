import Realm from 'realm';
import { IExercise, IExerciseByCategory } from '../../types/exerciseTypes';
import { SCHEMA_VERSION } from './';
import { Exercise } from './schemas/workout/WorkoutSchema';

export const getExercises = async () => {
  try {
    const realm = await Realm.open({
      schema: [Exercise.schema],
      schemaVersion: SCHEMA_VERSION
    });
    const exercises = JSON.parse(JSON.stringify(realm.objects('Exercise')));
    const exercisesByCategory: IExerciseByCategory[] = [];
    let exercisesCount = 0;
    Object.keys(exercises).forEach(key => {
      let found = false;
      /* Search if entry already exists, otherwise create new one */
      exercisesByCategory.forEach(item => {
        if (item.title === exercises[key].category) {
          item.data.push(exercises[key]);
          found = true;
          exercisesCount++;
        }
      });
      if (!found) {
        exercisesByCategory.push({ title: exercises[key].category, data: [exercises[key]] });
        exercisesCount++;
      }
    });
    realm.close();
    /* Sort categories alphabetically */
    exercisesByCategory.sort((a, b) => {
      return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
    });
    return { count: exercisesCount, results: exercisesByCategory };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const saveExercise = async (exercise: IExercise) => {
  try {
    const realm = await Realm.open({
      schema: [Exercise.schema],
      schemaVersion: SCHEMA_VERSION
    });
    const test = new Exercise(exercise.id, exercise.name, exercise.description, exercise.category, exercise.muscles);
    if (exercise.id === 0) {
      const maxId = Number(realm.objects('Exercise').max('id')) + 1 || 1;
      test.id = maxId;
      realm.write(() => {
        realm.create(Exercise.schema.name, test);
      });
    } else {
      realm.write(() => {
        realm.create(Exercise.schema.name, exercise, true);
      });
    }
    realm.close();
    return exercise;
  } catch (error) {
    throw error;
  }
};

export const deleteExercise = async (id: number) => {
  try {
    const realm = await Realm.open({
      schema: [Exercise.schema],
      schemaVersion: SCHEMA_VERSION
    });
    const exercise = realm.objects<Exercise>(Exercise.schema.name).filtered('id = ' + id);
    realm.write(() => {
      realm.delete(exercise);
    });
    return id;
  } catch (error) {
    throw error;
  }
};

export const getExerciseById = async (id: number) => {
  try {
    const exercise: IExercise = { id: 0, description: '', name: '', muscles: [], category: '' };
    if (id !== 0) {
      const realm = await Realm.open({
        schema: [Exercise.schema],
        schemaVersion: SCHEMA_VERSION
      });
      const exerciseCopy = JSON.parse(
        JSON.stringify(realm.objects<Exercise>(Exercise.schema.name).filtered('id = ' + id))
      );
      exercise.id = exerciseCopy[0].id;
      exercise.description = exerciseCopy[0].description || '';
      exercise.name = exerciseCopy[0].name || '';
      exercise.category = exerciseCopy[0].category || '';
      exercise.muscles = Object.keys(exerciseCopy[0].muscles).map(key => exerciseCopy[0].muscles[key]);
    }
    return exercise;
  } catch (error) {
    throw error;
  }
};

export default {
  saveExercise,
  getExercises,
  deleteExercise,
  getExerciseById
};
