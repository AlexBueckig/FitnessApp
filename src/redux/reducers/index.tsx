import { combineReducers, Reducer } from 'redux';
import IStoreState from '../../types';

import DayReducer from './DayReducer';
import FeedReducer from './FeedReducer';
import WorkoutReducer from './WorkoutReducer';

const rootReducer: Reducer<IStoreState> = combineReducers({
  feedState: FeedReducer,
  workoutsState: WorkoutReducer,
  daysState: DayReducer
});

export default rootReducer;
