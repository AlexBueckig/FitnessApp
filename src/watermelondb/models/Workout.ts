import { Model, Query } from '@nozbe/watermelondb';
import { action, children, field, text } from '@nozbe/watermelondb/decorators';
import Day, { ISaveDayParams } from './Day';

export interface ISaveWorkoutParams {
  name: string;
  active: boolean;
}

class Workout extends Model {
  static table = 'workouts';

  static associations = {
    days: { type: 'has_many', foreignKey: 'workout_id' }
  };

  @text('name')
  name: string;

  @field('active')
  active: boolean;

  @children('days')
  days: Query<Day>;

  @action async deleteEntry() {
    await this.destroyPermanently();
  }

  @action async updateEntry({ name, active }: ISaveWorkoutParams) {
    await this.update(workout => {
      workout.name = name;
      workout.active = active;
    });
  }

  @action async addDay({ description, days }: ISaveDayParams) {
    const daysCollection = this.collections.get<Day>('days');
    return await daysCollection.create(day => {
      day.workout.set(this);
      day.description = description;
      day.days = days;
    });
  }
}

export default Workout;
