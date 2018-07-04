import Realm from 'realm';
import FeedSchema from './FeedSchema';
import { ExerciseSchema, WorkoutSchema } from './WorkoutSchema';

export default new Realm({ schema: [ExerciseSchema, FeedSchema, WorkoutSchema] });
