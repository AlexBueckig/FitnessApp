import { Alert } from 'react-native';
import Realm from 'realm';
import { IDay } from '../../types/dayTypes';
import { ISet } from '../../types/workoutTypes';
import { SCHEMA_VERSION } from './';
import { Day, Exercise, Set, Setting, Workout } from './schemas/workout/WorkoutSchema';

export const getDays = async () => {
  try {
    const realm = await Realm.open({
      schema: [Workout.schema, Day.schema, Set.schema, Setting.schema, Exercise.schema],
      schemaVersion: SCHEMA_VERSION
    });
    const days = JSON.parse(JSON.stringify(realm.objects('Workout')));
    const daysCopy: IDay[] = [];
    Object.keys(days).forEach(key => daysCopy.push(days[key]));
    realm.close();
    return { count: daysCopy.length, results: daysCopy };
  } catch (error) {
    console.log(error);
    Alert.alert(error);
    return error;
  }
};

export const saveDay = async (day: IDay) => {
  try {
    const realm = await Realm.open({
      schema: [Workout.schema, Day.schema, Set.schema, Setting.schema, Exercise.schema],
      schemaVersion: SCHEMA_VERSION
    });
    const test = new Day(day.id, day.description, day.day, day.sets);
    if (day.id === 0) {
      const maxId = Number(realm.objects('Day').max('id')) + 1 || 1;
      test.id = maxId;
      realm.write(() => {
        realm.create(Day.schema.name, test);
      });
    } else {
      realm.write(() => {
        realm.create(Day.schema.name, day, true);
      });
    }
    realm.close();
    return day;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteDay = async (id: number) => {
  try {
    const realm = await Realm.open({
      schema: [Workout.schema, Day.schema, Set.schema, Setting.schema, Exercise.schema],
      schemaVersion: SCHEMA_VERSION
    });
    const day = realm.objects<Day>(Day.schema.name).filtered('id = ' + id);
    realm.write(() => {
      realm.delete(day);
    });
    return id;
  } catch (error) {
    return error;
  }
};

export const getDayById = async (id: number) => {
  try {
    const day: IDay = { id: 0, sets: [], day: [], description: '' };
    if (id !== 0) {
      const realm = await Realm.open({
        schema: [Workout.schema, Day.schema, Set.schema, Setting.schema, Exercise.schema],
        schemaVersion: SCHEMA_VERSION
      });
      const days = JSON.parse(JSON.stringify(realm.objects<Day>(Day.schema.name).filtered('id = ' + id)));
      const setsCopy: ISet[] = [];
      Object.keys(days).forEach(key => {
        Object.keys(days[key].sets).forEach(set => {
          setsCopy.push(days[key].sets[set]);
        });
        day.id = days[key].id;
        day.sets = setsCopy;
        day.description = days[key].comment;
      });
    }
    return day;
  } catch (error) {
    return error;
  }
};

export default {
  saveDay,
  getDays,
  deleteDay,
  getDayById
};
