import { combineReducers, Reducer } from 'redux';
import IStoreState from '../types';

import FeedReducer from './FeedReducer';

const rootReducer: Reducer<IStoreState> = combineReducers({ feed: FeedReducer });

export default rootReducer;
