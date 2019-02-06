import { IAddToast, IClearToasts, IRemoveToast, IToast } from '../../types/toastTypes';
import * as constants from '../constants/toastConstants';

export function addToast(toast: IToast): IAddToast {
  return {
    type: constants.ADD_TOAST,
    toast
  };
}

export function removeToast(id: number): IRemoveToast {
  return {
    type: constants.REMOVE_TOAST,
    id
  };
}

export function clearToasts(): IClearToasts {
  return {
    type: constants.CLEAR_TOASTS
  };
}
