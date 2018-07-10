import { connect, Dispatch } from 'react-redux';
import { getWorkouts } from '../redux/actions/workoutActions';
import WorkoutScreen from '../screens/WorkoutScreen';
import IStoreState from '../types';
import { IWorkoutsAction } from '../types/workoutTypes';

export const mapStateToProps = (state: IStoreState) => ({
  workouts: state.workouts.workouts
});

export const mapDispatchToProps = (dispatch: Dispatch<IWorkoutsAction>) => ({
  getWorkouts: () => dispatch(getWorkouts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  { withRef: true }
)(WorkoutScreen);
