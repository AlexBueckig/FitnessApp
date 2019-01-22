import { Day } from './DaySchema';
import { Exercise } from './ExerciseSchema';
import { Feed } from './FeedSchema';
import { Set } from './SetSchema';
import { Setting } from './SettingSchema';
import { Workout } from './WorkoutSchema';

export { Feed };

export default new Realm({ schema: [Day, Exercise, Set, Setting, Workout] });
