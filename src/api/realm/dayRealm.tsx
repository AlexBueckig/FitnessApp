import { Alert } from 'react-native';
import { IDay } from '../../types/dayTypes';
import { Exercise } from '../realm/schemas/ExerciseSchema';
import { Set } from '../realm/schemas/SetSchema';
import realm from './schemas/';
import { Day } from './schemas/DaySchema';

export const getDays = async () => {
  try {
    const days = JSON.parse(JSON.stringify(realm.objects('Day')));
    const daysCopy: IDay[] = [];
    Object.keys(days).forEach(key => daysCopy.push(days[key]));
    return { count: daysCopy.length, results: daysCopy };
  } catch (error) {
    console.log(error);
    Alert.alert(error);
    return error;
  }
};

export const saveDay = async (day: Day) => {
  try {
    const newDay = new Day(day.id, day.description, day.days, []);
    if (day.id === 0) {
      const maxId = Number(realm.objects('Day').max('id')) + 1 || 1;
      newDay.id = maxId;
    }
    realm.write(() => {
      const sets = day.sets.map<Set>(set => {
        let id = set.id;
        if (id === 0) {
          id = Number(realm.objects('Set').max('id')) + 1 || 1;
        }
        let exercise;
        if (set.exercise) {
          exercise = realm.objectForPrimaryKey<Exercise>('Exercise', set.exercise.id);
        }
        return realm.create(Set.schema.name, { id, sets: 2, exercise }, true);
      });
      return realm.create(Day.schema.name, { ...newDay, sets }, true);
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteDay = async (id: number) => {
  try {
    const day = realm.objects<IDay>(Day.schema.name).filtered('id = ' + id);
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
    const day: IDay = { id: 0, sets: [], days: [], description: '' };
    if (id !== 0) {
      const days = JSON.parse(JSON.stringify(realm.objects<Day>(Day.schema.name).filtered('id = ' + id)));
      const setsCopy: Set[] = [];
      Object.keys(days).forEach(key => {
        Object.keys(days[key].sets).forEach(set => {
          setsCopy.push(days[key].sets[set]);
        });
        day.id = days[key].id;
        day.sets = setsCopy;
        day.days = Object.values(days[key].days);
        day.description = days[key].description;
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
