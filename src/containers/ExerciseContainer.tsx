import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { deleteExercise, getExercises } from '../redux/actions/exerciseActions';
import ExerciseScreen from '../screens/ExerciseScreen';
import IStoreState from '../types';
import { IDeleteExerciseAction, IGetExercisesAction } from '../types/exerciseTypes';

export const mapStateToProps = (state: IStoreState) => ({
  exercises: state.exercisesState.exercises,
  isFetching: state.exercisesState.isFetching
});

export const mapDispatchToProps = (dispatch: Dispatch<IGetExercisesAction | IDeleteExerciseAction>) => ({
  getExercises: () => dispatch(getExercises()),
  deleteExercise: (id: number) => dispatch(deleteExercise(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  { withRef: true }
)(ExerciseScreen);
