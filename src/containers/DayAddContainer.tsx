import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { deleteDay, getDayById, saveDay } from '../redux/actions/dayActions';
import { getExercises } from '../redux/actions/exerciseActions';
import DayAddScreen from '../screens/DayAddScreen';
import IStoreState from '../types';
import { IDay, IDeleteDay, IGetDayById, ISaveDay } from '../types/dayTypes';
import { IGetExercises } from '../types/exerciseTypes';

export const mapStateToProps = (state: IStoreState) => ({
  day: state.daysState.currentDay,
  exercises: state.exercisesState.exercises,
  isFetching: state.daysState.isFetching
});

export const mapDispatchToProps = (dispatch: Dispatch<ISaveDay | IGetDayById | IDeleteDay | IGetExercises>) => ({
  saveDay: (day: IDay) => dispatch(saveDay(day)),
  getDayById: (id: number) => dispatch(getDayById(id)),
  deleteDay: (id: number) => dispatch(deleteDay(id)),
  getExercises: () => dispatch(getExercises())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  { withRef: true }
)(DayAddScreen);
