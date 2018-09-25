import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getWorkoutById, saveWorkout } from '../redux/actions/workoutActions';
import WorkoutAddScreen from '../screens/WorkoutAddScreen';
import IStoreState from '../types';
import { IGetWorkoutById, ISaveWorkout, IWorkout } from '../types/workoutTypes';

export const mapStateToProps = (state: IStoreState) => ({
  workout: state.workoutsState.currentWorkout,
  isFetching: state.workoutsState.isFetching
});

export const mapDispatchToProps = (dispatch: Dispatch<ISaveWorkout | IGetWorkoutById>) => ({
  saveWorkout: (workout: IWorkout) => dispatch(saveWorkout(workout)),
  getWorkoutById: (id: number) => dispatch(getWorkoutById(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  { withRef: true }
)(WorkoutAddScreen);
