import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getDayById, saveDay } from '../redux/actions/dayActions';
import DayAddScreen from '../screens/DayAddScreen';
import IStoreState from '../types';
import { IDay, IGetDayById, ISaveDay } from '../types/dayTypes';

export const mapStateToProps = (state: IStoreState) => ({
  day: state.daysState.currentDay,
  isFetching: state.daysState.isFetching
});

export const mapDispatchToProps = (dispatch: Dispatch<ISaveDay | IGetDayById>) => ({
  saveDay: (day: IDay) => dispatch(saveDay(day)),
  getDayById: (id: number) => dispatch(getDayById(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  { withRef: true }
)(DayAddScreen);
