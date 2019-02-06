import { IToastsAction, IToastState } from '../../types/toastTypes';
import * as constants from '../constants/toastConstants';

const initialState: IToastState = [];

export default (state = initialState, action: IToastsAction) => {
  switch (action.type) {
    case constants.ADD_TOAST:
      return [action.toast, ...state];
    case constants.REMOVE_TOAST:
      return state.filter(toast => toast.id !== action.id);
    case constants.CLEAR_TOASTS:
      return [];
    default:
      return state;
  }
};
