import Realm from 'realm';
import { Set } from './SetSchema';

export class Day {
  public static schema: Realm.ObjectSchema = {
    name: 'Day',
    primaryKey: 'id',
    properties: {
      id: 'int',
      description: 'string',
      day: 'int[]',
      sets: 'Set[]'
    }
  };

  public id: number;
  public description: string;
  public day: number[];
  public sets: Set[];

  constructor(id: number, description: string, day: number[], sets: Set[]) {
    this.id = id;
    this.description = description;
    this.day = day;
    this.sets = sets;
  }
}
