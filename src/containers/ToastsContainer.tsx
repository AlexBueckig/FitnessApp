import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Toasts from '../components/Toasts';

import { removeToast } from '../redux/actions/toastActions';
import IStoreState from '../types';
import { IToastsAction } from '../types/toastTypes';

export const mapStateToProps = (state: IStoreState) => ({
  toasts: state.toastState
});

export const mapDispatchToProps = (dispatch: Dispatch<IToastsAction>) => ({
  removeToast: (id: number) => dispatch(removeToast(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  { withRef: true }
)(Toasts);
