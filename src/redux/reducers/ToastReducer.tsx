import { IToastsAction, IToastState } from '../../types/toastTypes';
import * as constants from '../constants/toastConstants';

const initialState: IToastState = [];

let id = 0;

export default (state = initialState, action: IToastsAction) => {
  switch (action.type) {
    case constants.ADD_TOAST:
      return [{ id: id++, message: action.message }, ...state];
    case constants.REMOVE_TOAST:
      return state.filter(toast => toast.id !== action.id);
    case constants.CLEAR_TOASTS:
      return [];
    default:
      return state;
  }
};
