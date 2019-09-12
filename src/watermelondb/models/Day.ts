import { Model, Q, Query, Relation } from '@nozbe/watermelondb';
import { action, children, json, lazy, relation, text } from '@nozbe/watermelondb/decorators';
import { Associations } from '@nozbe/watermelondb/Model';
import DayExercises from './DayExercises';
import Exercise from './Exercise';
import Workout from './Workout';

export interface ISaveDayParams {
  description: string;
  days: number[];
}

export interface IAddExerciseParams {
  exerciseId: string;
}

class Day extends Model {
  static table = 'days';

  static associations: Associations = {
    workouts: { type: 'belongs_to', key: 'workout_id' },
    day_exercises: { type: 'has_many', foreignKey: 'day_id' }
  };

  @text('description')
  description: string;

  @json('days', (days: number[]) => days)
  days: number[];

  @relation('workouts', 'workout_id')
  workout: Relation<Workout>;

  @children('workout_exercises')
  dayExercises: Query<DayExercises>;

  @lazy
  exercises = this.collections.get<Exercise>('exercises').query(Q.on('day_exercises', 'day_id', this.id));

  @action async deleteEntry() {
    await this.destroyPermanently();
  }

  @action async updateEntry({ description, days }: ISaveDayParams) {
    await this.update(day => {
      day.description = description;
      day.days = days;
    });
  }

  @action async addExercise({ exerciseId }: IAddExerciseParams) {
    const dayExercisesCollection = this.collections.get<DayExercises>('day_exercises');
    return await dayExercisesCollection.create(item => {
      item.exerciseId = exerciseId;
      item.dayId = this.id;
    });
  }
}

export default Day;
