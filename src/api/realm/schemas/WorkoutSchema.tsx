import Realm from 'realm';
import { IDay } from '../../../types/dayTypes';

export class Workout {
  public static schema: Realm.ObjectSchema = {
    name: 'Workout',
    primaryKey: 'id',
    properties: {
      id: 'int',
      comment: 'string',
      creation_date: 'date',
      days: 'Day[]'
    }
  };

  public id: number;
  public comment: string;
  public creation_date: Date;
  public days: IDay[];

  constructor(id: number, comment: string, creationDate: Date, days: IDay[]) {
    this.id = id;
    this.comment = comment;
    this.creation_date = creationDate;
    this.days = days;
  }
}
