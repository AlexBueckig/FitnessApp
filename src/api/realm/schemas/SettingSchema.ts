import Realm from 'realm';
import { IExercise } from '../../../types/exerciseTypes';

export class Setting {
  public static schema: Realm.ObjectSchema = {
    name: 'Setting',
    primaryKey: 'id',
    properties: {
      id: 'int',
      exercise: 'Exercise',
      repetition_unit: 'string',
      weight_unit: 'string',
      comment: 'string',
      order: 'int',
      reps: 'int',
      weight: 'float'
    }
  };

  public id: number;
  public exercise: IExercise;
  public repetition_unit: string;
  public weight_unit: string;
  public comment: string;
  public order: number;
  public reps: number;
  public weight: number;

  constructor(
    id: number,
    exercise: IExercise,
    repetition_unit: string,
    weight_unit: string,
    comment: string,
    order: number,
    reps: number,
    weight: number
  ) {
    this.id = id;
    this.exercise = exercise;
    this.repetition_unit = repetition_unit;
    this.weight_unit = weight_unit;
    this.comment = comment;
    this.order = order;
    this.reps = reps;
    this.weight = weight;
  }
}
