import { Model } from '@nozbe/watermelondb';
import { action, json, text } from '@nozbe/watermelondb/decorators';

export interface ISaveExerciseParams {
  name: string;
  description: string;
  category: string;
  muscles: number[];
}

class Exercise extends Model {
  public static table = 'exercises';

  @text('name') name: string;
  @text('description') description: string;
  @text('category') category: string;
  @json('muscles', test => test) muscles: number[];

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
