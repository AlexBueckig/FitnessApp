import * as constants from '../redux/constants/dayConstants';
import { ISet } from './workoutTypes';

export interface IDayState {
  days: IDays;
  error?: string;
  isFetching: boolean;
}

export interface IDays {
  count: number;
  results: IDay[];
}

export interface IDay {
  id: number;
  description: string;
  day?: number[];
  sets?: ISet[];
}

/* Day Actions */
export interface IGetDays {
  type: constants.GET_DAYS;
}

export interface IGetDaysSuccess {
  type: constants.GET_DAYS_SUCCESS;
  days: IDays;
}

export interface IGetDaysFailure {
  type: constants.GET_DAYS_FAILURE;
  error: string;
}

export type IGetDaysAction = IGetDays | IGetDaysSuccess | IGetDaysFailure;

export interface IGetDayById {
  type: constants.GET_DAY_BY_ID;
  id: number;
}

export interface IGetDayByIdSuccess {
  type: constants.GET_DAY_BY_ID_SUCCESS;
  day: IDay;
}

export interface IGetDayByIdFailure {
  type: constants.GET_DAY_BY_ID_FAILURE;
  error: string;
}

export type IGetDayByIdAction = IGetDayById | IGetDayByIdSuccess | IGetDayByIdFailure;

export interface ISaveDay {
  type: constants.SAVE_DAY;
  day: IDay;
}

export interface ISaveDaySuccess {
  type: constants.SAVE_DAY_SUCCESS;
  day: IDay;
}

export interface ISaveDayFailure {
  type: constants.SAVE_DAY_FAILURE;
  error: string;
}

export type ISaveDayAction = ISaveDay | ISaveDaySuccess | ISaveDayFailure;

export interface IDeleteDay {
  type: constants.DELETE_DAY;
  id: number;
}

export interface IDeleteDaySuccess {
  type: constants.DELETE_DAY_SUCCESS;
  id: number;
}

export interface IDeleteDayFailure {
  type: constants.DELETE_DAY_FAILURE;
  error: string;
}

export type IDeleteDayAction = IDeleteDay | IDeleteDaySuccess | IDeleteDayFailure;

export type IDayAction = IGetDaysAction | IGetDayByIdAction | ISaveDayAction | IDeleteDayAction;
