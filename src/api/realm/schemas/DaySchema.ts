import Realm from 'realm';
import { Set } from './SetSchema';

export class Day {
  public static schema: Realm.ObjectSchema = {
    name: 'Day',
    primaryKey: 'id',
    properties: {
      id: 'int',
      description: 'string',
      days: 'int[]',
      sets: 'Set[]'
    }
  };

  public id: number;
  public description: string;
  public days: number[];
  public sets: Set[];

  constructor(id: number, description: string, days: number[], sets: Set[]) {
    this.id = id;
    this.description = description;
    this.days = days;
    this.sets = sets;
  }
}
