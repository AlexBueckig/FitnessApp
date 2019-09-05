import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';
import { Associations } from '@nozbe/watermelondb/Model';

class SetExercises extends Model {
  static table = 'set_exercises';
  static associations: Associations = {
    sets: { type: 'belongs_to', key: 'set_id' },
    exercises: { type: 'belongs_to', key: 'exercise_id' }
  };

  @field('set_id') setId: string;
  @field('exercise_id') exerciseId: string;
}

export default SetExercises;
