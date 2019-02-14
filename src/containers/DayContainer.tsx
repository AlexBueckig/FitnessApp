import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { deleteDay, getDays } from '../redux/actions/dayActions';
import DayScreen from '../screens/DayScreen';
import IStoreState from '../types';
import { IDeleteDayAction, IGetDaysAction } from '../types/dayTypes';

export const mapStateToProps = (state: IStoreState) => ({
  days: state.daysState.days,
  isFetching: state.daysState.isFetching
});

export const mapDispatchToProps = (dispatch: Dispatch<IGetDaysAction | IDeleteDayAction>) => ({
  getDays: () => dispatch(getDays()),
  deleteDay: (id: number) => dispatch(deleteDay(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DayScreen);
