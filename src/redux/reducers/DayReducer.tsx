import { IDay, IDayAction, IDayState } from '../../types/dayTypes';
import * as constants from '../constants/dayConstants';

const initialState = {
  days: { count: 0, results: [] },
  currentDay: { id: 0, description: '', day: [], sets: [] },
  error: '',
  isFetching: false
};

export default (state: IDayState = initialState, action: IDayAction): IDayState => {
  switch (action.type) {
    case constants.GET_DAYS:
    case constants.GET_DAY_BY_ID:
      return { ...state, isFetching: true };
    case constants.GET_DAYS_SUCCESS:
      return { ...state, days: action.days, isFetching: false };
    case constants.GET_DAYS_FAILURE:
      return { ...state, days: { count: 0, results: [] }, error: action.error, isFetching: false };
    case constants.DELETE_DAY_SUCCESS:
      const index = state.days.results.findIndex((element: IDay) => element.id === action.id);
      const results = state.days.results;
      results.splice(index, 1);
      return { ...state, days: { count: results.length, results } };
    case constants.GET_DAY_BY_ID_SUCCESS:
      return { ...state, currentDay: action.day, isFetching: false };
    case constants.GET_DAY_BY_ID_FAILURE:
      return {
        ...state,
        currentDay: { id: 0, description: '', day: [], sets: [] },
        isFetching: false
      };
    default:
      return state;
  }
};
