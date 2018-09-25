import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { deleteWorkout, getWorkouts } from '../redux/actions/workoutActions';
import WorkoutScreen from '../screens/WorkoutScreen';
import IStoreState from '../types';
import { IDeleteWorkoutAction, IGetWorkoutsAction } from '../types/workoutTypes';

export const mapStateToProps = (state: IStoreState) => ({
  workouts: state.workoutsState.workouts,
  isFetching: state.workoutsState.isFetching
});

export const mapDispatchToProps = (dispatch: Dispatch<IGetWorkoutsAction | IDeleteWorkoutAction>) => ({
  getWorkouts: () => dispatch(getWorkouts()),
  deleteWorkout: (id: number) => dispatch(deleteWorkout(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  { withRef: true }
)(WorkoutScreen);
