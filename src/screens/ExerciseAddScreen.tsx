import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import ExerciseForm from '../components/ExerciseForm';
import Exercise, { ISaveExerciseParams } from '../watermelondb/models/Exercise';

interface IProps {
  saveExercise: (exercise: ISaveExerciseParams) => void;
  exercise: Exercise | undefined;
}

interface IState {
  muscles: number[];
}

class ExerciseAddScreen extends Component<IProps, IState> {
  public render() {
    const { exercise } = this.props;
    return (
      <ScrollView>
        <ExerciseForm
          name={(exercise && exercise.name) || ''}
          category={(exercise && exercise.category) || ''}
          description={(exercise && exercise.description) || ''}
          muscles={(exercise && exercise.muscles) || []}
          submit={this.submit}
        />
      </ScrollView>
    );
  }

  private submit = (exercise: ISaveExerciseParams) => {
    this.props.saveExercise(exercise);
  };
}

export default ExerciseAddScreen;
