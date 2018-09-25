import { IDay, IDayAction, IDayState } from '../../types/dayTypes';
import * as constants from '../constants/dayConstants';

const initialState = {
  days: { count: 0, results: [] },
  error: '',
  isFetching: false
};

export default (state: IDayState = initialState, action: IDayAction): IDayState => {
  switch (action.type) {
    case constants.SAVE_DAY:
      return state;
    case constants.SAVE_DAY_SUCCESS:
      return state;
    case constants.SAVE_DAY_FAILURE:
      return state;
    case constants.GET_DAYS:
      return state;
    case constants.GET_DAYS_SUCCESS:
      return state;
    case constants.GET_DAYS_FAILURE:
      return state;
    case constants.GET_DAY_BY_ID:
      return state;
    case constants.GET_DAY_BY_ID_SUCCESS:
      return state;
    case constants.GET_DAY_BY_ID_FAILURE:
      return state;
    case constants.DELETE_DAY_SUCCESS:
      const index = state.days.results.findIndex((element: IDay) => element.id === action.id);
      const results = state.days.results;
      results.splice(index, 1);
      return { ...state, days: { count: results.length, results } };
    default:
      return state;
  }
};
