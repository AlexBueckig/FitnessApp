import { IAddToast, IClearToasts, IRemoveToast } from '../../types/toastTypes';
import * as constants from '../constants/toastConstants';

export function addToast(message: string): IAddToast {
  return {
    type: constants.ADD_TOAST,
    message
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
