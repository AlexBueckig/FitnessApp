import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { saveDay } from '../redux/actions/dayActions';
import DayAddScreen from '../screens/DayAddScreen';
import IStoreState from '../types';
import { IDay, ISaveDay } from '../types/dayTypes';

export const mapStateToProps = (state: IStoreState) => ({
  workout: state.workoutsState.currentWorkout,
  isFetching: state.workoutsState.isFetching
});

export const mapDispatchToProps = (dispatch: Dispatch<ISaveDay>) => ({
  saveDay: (day: IDay) => dispatch(saveDay(day))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  { withRef: true }
)(DayAddScreen);
