import { combineReducers, Reducer } from 'redux';
import IStoreState from '../../types';

import FeedReducer from './FeedReducer';
import WorkoutReducer from './WorkoutReducer';

const rootReducer: Reducer<IStoreState> = combineReducers({ feedState: FeedReducer, workoutsState: WorkoutReducer });

export default rootReducer;
