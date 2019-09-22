import { Model, Relation } from '@nozbe/watermelondb';
import { action, field, relation } from '@nozbe/watermelondb/decorators';
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

  @field('training_day') trainingDay: string;
  @field('reps') reps: number;
  @field('weight') weight: number;

  @action async deleteEntry() {
    await this.destroyPermanently();
  }
}

export default Workoutlog;
