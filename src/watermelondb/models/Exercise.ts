import { Model, Q } from '@nozbe/watermelondb';
import { action, json, lazy, text } from '@nozbe/watermelondb/decorators';
import { Associations } from '@nozbe/watermelondb/Model';
import Day from './Day';

export interface ISaveExerciseParams {
  name: string;
  description: string;
  category: string;
  muscles: number[];
}

class Exercise extends Model {
  public static table = 'exercises';

  static associations: Associations = {
    day_exercises: { type: 'has_many', foreignKey: 'exercise_id' }
  };

  @text('name') name: string;
  @text('description') description: string;
  @text('category') category: string;
  @json('muscles', (muscles: number[]) => muscles) muscles: number[];

  @lazy
  days = this.collections.get<Day>('days').query(Q.on('day_exercises', 'exercise_id', this.id));

  @action async deleteEntry() {
    await this.destroyPermanently();
  }

  @action async updateEntry({ name, description, category, muscles }: ISaveExerciseParams) {
    await this.update(exercise => {
      exercise.name = name;
      exercise.description = description;
      exercise.category = category;
      exercise.muscles = muscles;
    });
  }
}

export default Exercise;
