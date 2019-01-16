import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { deleteExercise, getExerciseById, saveExercise } from '../redux/actions/exerciseActions';
import ExerciseAddScreen from '../screens/ExerciseAddScreen';
import IStoreState from '../types';
import { IDeleteExercise, IExercise, IGetExerciseById, ISaveExercise } from '../types/exerciseTypes';

export const mapStateToProps = (state: IStoreState) => ({
  exercise: state.exercisesState.currentExercise,
  isFetching: state.exercisesState.isFetching
});

export const mapDispatchToProps = (dispatch: Dispatch<ISaveExercise | IGetExerciseById | IDeleteExercise>) => ({
  saveExercise: (exercise: IExercise) => dispatch(saveExercise(exercise)),
  getExerciseById: (id: number) => dispatch(getExerciseById(id)),
  deleteExercise: (id: number) => dispatch(deleteExercise(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  { withRef: true }
)(ExerciseAddScreen);
