import * as constants from '../redux/constants/toastConstants';

export type IToastState = IToast[];

export interface IToast {
  id: number;
  message: string;
}

/* Exercise Actions */
export interface IAddToast {
  type: constants.ADD_TOAST;
  message: string;
}

export interface IRemoveToast {
  type: constants.REMOVE_TOAST;
  id: number;
}

export interface IClearToasts {
  type: constants.CLEAR_TOASTS;
}

export type IToastsAction = IAddToast | IRemoveToast | IClearToasts;
