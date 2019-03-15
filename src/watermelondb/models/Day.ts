import { Model, Query, Relation } from '@nozbe/watermelondb';
import { action, children, json, relation, text } from '@nozbe/watermelondb/decorators';
import Set, { ISaveSetParams } from './Set';
import Workout from './Workout';

export interface ISaveDayParams {
  description: string;
  days: number[];
}

class Day extends Model {
  static table = 'days';

  static associations = {
    workouts: { type: 'belongs_to', key: 'workout_id' },
    sets: { type: 'has_many', foreignKey: 'day_id' }
  };

  @text('description')
  description: string;

  @json('days', days => days)
  days: number[];

  @relation('workouts', 'workout_id')
  workout: Relation<Workout>;

  @children('sets')
  sets: Query<Set>;

  @action async deleteEntry() {
    await this.destroyPermanently();
  }

  @action async updateEntry({ description, days }: ISaveDayParams) {
    await this.update(day => {
      day.description = description;
      day.days = days;
    });
  }

  @action async addSet({ sets, exercises }: ISaveSetParams) {
    const setsCollection = this.collections.get<Set>('sets');
    return await setsCollection.create(set => {
      set.day.set(this);
      set.sets = sets;
      for (const exercise of exercises) {
        this.subAction(() => set.addExercise({ exerciseId: exercise }));
      }
    });
  }
}

export default Day;
