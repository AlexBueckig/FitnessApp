import { Model, Q } from '@nozbe/watermelondb';
import { action, json, lazy, text } from '@nozbe/watermelondb/decorators';
import Set from './Set';

export interface ISaveExerciseParams {
  name: string;
  description: string;
  category: string;
  muscles: number[];
}

class Exercise extends Model {
  public static table = 'exercises';

  static associations = {
    set_exercises: { type: 'has_many', foreignKey: 'exercise_id' }
  };

  @text('name') name: string;
  @text('description') description: string;
  @text('category') category: string;
  @json('muscles', test => test) muscles: number[];

  @lazy
  sets = this.collections.get<Set>('sets').query(Q.on('set_exercises', 'exercise_id', this.id));

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
