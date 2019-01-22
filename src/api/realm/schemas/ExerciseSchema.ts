import Realm from 'realm';

export class Exercise {
  public static schema: Realm.ObjectSchema = {
    name: 'Exercise',
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
      description: 'string',
      category: 'string',
      muscles: 'int[]'
    }
  };

  public id: number;
  public name: string;
  public description: string;
  public category: string;
  public muscles: number[];

  constructor(id: number, name: string, description?: string, category?: string, muscles?: number[]) {
    this.id = id;
    this.name = name;
    this.description = description || '';
    this.category = category || '';
    this.muscles = muscles || [];
  }
}
