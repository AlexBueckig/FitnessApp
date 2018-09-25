import * as types from '../../types/dayTypes';
import * as constants from '../constants/dayConstants';

export function saveDay(day: types.IDay): types.ISaveDay {
  return {
    type: constants.SAVE_DAY,
    day
  };
}

export function saveDaySuccess(day: types.IDay): types.ISaveDaySuccess {
  return {
    type: constants.SAVE_DAY_SUCCESS,
    day
  };
}

export function saveDayFailure(error: string): types.ISaveDayFailure {
  return {
    type: constants.SAVE_DAY_FAILURE,
    error
  };
}
