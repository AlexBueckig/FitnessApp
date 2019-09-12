import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';
import { Associations } from '@nozbe/watermelondb/Model';

class DayExercises extends Model {
  static table = 'day_exercises';

  static associations: Associations = {
    exercises: { type: 'belongs_to', key: 'exercise_id' },
    days: { type: 'belongs_to', key: 'day_id' }
  };

  @field('exercise_id')
  exerciseId: string;

  @field('day_id')
  dayId: string;
}

export default DayExercises;
