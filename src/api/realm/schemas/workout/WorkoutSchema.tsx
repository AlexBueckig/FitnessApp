import Realm from 'realm';
import { IDay, IExercise, ISet, ISetting } from '../../../../types/workoutTypes';

export class Exercise {
  public static schema: Realm.ObjectSchema = {
    name: 'Exercise',
    primaryKey: 'id',
    properties: {
      id: 'int',
      exerciseId: 'int'
    }
  };

  public id: number;
  public exerciseId: number;

  constructor(id: number, exercideId: number) {
    this.id = id;
    this.exerciseId = exercideId;
  }
}

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
  public day: Date;
  public sets: ISet[];

  constructor(id: number, description: string, day: Date, sets: ISet[]) {
    this.id = id;
    this.description = description;
    this.day = day;
    this.sets = sets;
  }
}
export class Set {
  public static schema: Realm.ObjectSchema = {
    name: 'Set',
    primaryKey: 'id',
    properties: {
      id: 'int',
      order: 'int',
      sets: 'int',
      exercises: 'Exercise[]',
      settings: 'Setting[]'
    }
  };

  public id: number;
  public order: number;
  public sets: number;
  public exercises: IExercise[];
  public settings: ISetting[];

  constructor(id: number, order: number, sets: number, exercises: Exercise[], settings: ISetting[]) {
    this.id = id;
    this.order = order;
    this.sets = sets;
    this.exercises = exercises;
    this.settings = settings;
  }
}

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
