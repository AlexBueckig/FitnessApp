import { connect, Dispatch } from 'react-redux';
import { getWorkouts } from '../actions/workoutActions';
import WorkoutScreen from '../screens/WorkoutScreen';
import IStoreState from '../types';
import { IWorkoutsAction } from '../types/workoutTypes';

export const mapStateToProps = (state: IStoreState) => ({
  posts: state.feed.posts
});

export const mapDispatchToProps = (dispatch: Dispatch<IWorkoutsAction>) => ({
  getPosts: () => dispatch(getWorkouts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  { withRef: true }
)(WorkoutScreen);
