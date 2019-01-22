import Realm from 'realm';
import { Exercise } from './ExerciseSchema';
import { Setting } from './SettingSchema';

export class Set {
  public static schema: Realm.ObjectSchema = {
    name: 'Set',
    properties: {
      id: 'int',
      order: 'int',
      sets: 'int',
      exercise: 'Exercise?',
      settings: 'Setting[]'
    }
  };

  public id: number;
  public order: number;
  public sets: number;
  public exercise?: Exercise;
  public settings?: Setting[];

  constructor(id: number, order: number, sets: number) {
    this.id = id;
    this.order = order;
    this.sets = sets;
  }
}
