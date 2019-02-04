import Realm from 'realm';
import { Exercise } from './ExerciseSchema';

export class Set {
  public static schema: Realm.ObjectSchema = {
    name: 'Set',
    properties: {
      id: 'int',
      sets: 'int',
      exercise: 'Exercise?'
    }
  };

  public id: number;
  public sets: number;
  public exercise?: Exercise;

  constructor(id: number, sets: number, exercise?: Exercise) {
    this.id = id;
    this.sets = sets;
    this.exercise = exercise;
  }
}
