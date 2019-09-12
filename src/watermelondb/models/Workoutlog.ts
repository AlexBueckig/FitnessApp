import { Model, Relation } from '@nozbe/watermelondb';
import { action, relation, text } from '@nozbe/watermelondb/decorators';
import Exercise from './Exercise';

export interface ISaveLogParams {
  name: string;
  description: string;
  category: string;
  muscles: number[];
}

class Workoutlog extends Model {
  public static table = 'workoutlog';

  @relation('exercises', 'exercise_id')
  exercise: Relation<Exercise>;

  @text('training_day') trainingDay: string;
  @text('reps') reps: number;
  @text('weight') weight: number;

  @action async deleteEntry() {
    await this.destroyPermanently();
  }
}

export default Workoutlog;
