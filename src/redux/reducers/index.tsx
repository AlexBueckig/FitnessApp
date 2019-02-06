import { combineReducers, Reducer } from 'redux';
import IStoreState from '../../types';

import DayReducer from './DayReducer';
import ExerciseReducer from './ExerciseReducer';
import FeedReducer from './FeedReducer';
import ToastReducer from './ToastReducer';
import WorkoutReducer from './WorkoutReducer';

const rootReducer: Reducer<IStoreState> = combineReducers({
  feedState: FeedReducer,
  workoutsState: WorkoutReducer,
  daysState: DayReducer,
  exercisesState: ExerciseReducer,
  toastState: ToastReducer
});

export default rootReducer;
