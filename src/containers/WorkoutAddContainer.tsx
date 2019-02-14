import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { deleteWorkout, getWorkoutById, saveWorkout } from '../redux/actions/workoutActions';
import WorkoutAddScreen from '../screens/WorkoutAddScreen';
import IStoreState from '../types';
import { IDeleteWorkout, IGetWorkoutById, ISaveWorkout, IWorkout } from '../types/workoutTypes';

export const mapStateToProps = (state: IStoreState) => ({
  workout: state.workoutsState.currentWorkout,
  isFetching: state.workoutsState.isFetching
});

export const mapDispatchToProps = (dispatch: Dispatch<ISaveWorkout | IGetWorkoutById | IDeleteWorkout>) => ({
  saveWorkout: (workout: IWorkout) => dispatch(saveWorkout(workout)),
  getWorkoutById: (id: number) => dispatch(getWorkoutById(id)),
  deleteWorkout: (id: number) => dispatch(deleteWorkout(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkoutAddScreen);
