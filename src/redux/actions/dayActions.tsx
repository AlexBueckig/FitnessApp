import * as types from '../../types/dayTypes';
import * as constants from '../constants/dayConstants';

export function getDays(): types.IGetDays {
  return {
    type: constants.GET_DAYS
  };
}

export function getDaysSuccess(days: types.IDays): types.IGetDaysSuccess {
  return {
    type: constants.GET_DAYS_SUCCESS,
    days
  };
}

export function getDaysFailure(error: string): types.IGetDaysFailure {
  return {
    type: constants.GET_DAYS_FAILURE,
    error
  };
}

export function getDayById(id: number): types.IGetDayById {
  return {
    type: constants.GET_DAY_BY_ID,
    id
  };
}

export function getDayByIdSuccess(day: types.IDay): types.IGetDayByIdSuccess {
  return {
    type: constants.GET_DAY_BY_ID_SUCCESS,
    day
  };
}

export function getDayByIdFailure(error: string): types.IGetDayByIdFailure {
  return {
    type: constants.GET_DAY_BY_ID_FAILURE,
    error
  };
}

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

export function deleteDay(id: number): types.IDeleteDay {
  return {
    type: constants.DELETE_DAY,
    id
  };
}

export function deleteDaySuccess(id: number): types.IDeleteDaySuccess {
  return {
    type: constants.DELETE_DAY_SUCCESS,
    id
  };
}

export function deleteDayFailure(error: string): types.IDeleteDayFailure {
  return {
    type: constants.DELETE_DAY_FAILURE,
    error
  };
}
