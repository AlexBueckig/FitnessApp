import { connect, Dispatch } from 'react-redux';
import { getWorkoutById, saveWorkout } from '../redux/actions/workoutActions';
import WorkoutAddScreen from '../screens/WorkoutAddScreen';
import IStoreState from '../types';
import { IGetWorkoutByIdAction, ISaveWorkoutAction, IWorkout } from '../types/workoutTypes';

export const mapStateToProps = (state: IStoreState) => ({
  workout: state.workouts.currentWorkout
});

export const mapDispatchToProps = (dispatch: Dispatch<ISaveWorkoutAction | IGetWorkoutByIdAction>) => ({
  saveWorkout: (workout: IWorkout) => dispatch(saveWorkout(workout)),
  getWorkoutById: (id: number) => dispatch(getWorkoutById(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  { withRef: true }
)(WorkoutAddScreen);
