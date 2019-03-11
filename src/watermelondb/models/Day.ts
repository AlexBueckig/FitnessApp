import { Model, Relation } from '@nozbe/watermelondb';
import { action, json, relation, text } from '@nozbe/watermelondb/decorators';
import Workout from './Workout';

export interface ISaveDayParams {
  description: string;
  days: number[];
}

class Day extends Model {
  static table = 'days';

  static associations = {
    workouts: { type: 'belongs_to', key: 'workout_id' }
  };

  @text('description')
  description: string;

  @json('days', days => days)
  days: number[];

  @relation('workouts', 'workout_id')
  workout: Relation<Workout>;

  @action async deleteEntry() {
    await this.destroyPermanently();
  }

  @action async updateEntry({ description, days }: ISaveDayParams) {
    await this.update(day => {
      day.description = description;
      day.days = days;
    });
  }
}

export default Day;
