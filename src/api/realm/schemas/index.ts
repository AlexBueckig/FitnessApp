import Realm from 'realm';

import { Day } from './DaySchema';
import { Exercise } from './ExerciseSchema';
import { Feed } from './FeedSchema';
import { Set } from './SetSchema';
import { Setting } from './SettingSchema';
import { Workout } from './WorkoutSchema';

const SCHEMA_VERSION = 12;

const schemas = { Day, Exercise, Set, Setting, Workout, Feed };

export { schemas };

export default new Realm({
  schema: [Day.schema, Exercise.schema, Set.schema, Setting.schema, Workout.schema],
  schemaVersion: SCHEMA_VERSION
});
