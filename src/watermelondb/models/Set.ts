import { Model, Q, Query, Relation } from '@nozbe/watermelondb';
import { action, children, field, lazy, relation } from '@nozbe/watermelondb/decorators';
import Day from './Day';
import Exercise from './Exercise';
import SetExercises from './SetExercises';

export interface ISaveSetParams {
  sets: number;
  exercises: string[];
}

export interface IExerciseParams {
  exerciseId: string;
}

class Set extends Model {
  static table = 'sets';

  static associations = {
    days: { type: 'belongs_to', key: 'day_id' },
    set_exercises: { type: 'has_many', foreignKey: 'set_id' }
  };

  @field('sets')
  sets: number;

  @relation('days', 'day_id')
  day: Relation<Day>;

  @children('set_exercises')
  setExercises: Query<SetExercises>;

  @lazy
  exercises = this.collections.get<Exercise>('exercises').query(Q.on('set_exercises', 'set_id', this.id));

  @action async updateEntry({ sets }: ISaveSetParams) {
    this.update(set => {
      set.sets = sets;
    });
  }

  @action async addExercise({ exerciseId }: IExerciseParams) {
    const setExercisesCollection = this.collections.get<SetExercises>('set_exercises');
    return await setExercisesCollection.create(item => {
      item.exerciseId = exerciseId;
      item.setId = this.id;
    });
  }

  @action async deleteExercise({ exerciseId }: IExerciseParams) {
    const setExercisesCollection = this.collections.get<SetExercises>('set_exercises');
    const exercise = await setExercisesCollection.find(exerciseId);
    exercise.destroyPermanently();
  }
}

export default Set;
