import React, { PureComponent } from 'react';
import { Alert, ScrollView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import ExerciseForm from '../components/ExerciseForm';
import { IDeleteExercise, IExercise, IGetExerciseById, ISaveExercise } from '../types/exerciseTypes';

interface IProps {
  getExerciseById: (id: number) => IGetExerciseById;
  saveExercise: (exercise: IExercise) => ISaveExercise;
  deleteExercise: (id: number) => IDeleteExercise;
  exercise: IExercise;
  id: number;
  isFetching: boolean;
}

interface IState {
  muscles: number[];
}

class ExerciseAddScreen extends PureComponent<IProps, IState> {
  public static options() {
    return {
      topBar: {
        title: { text: 'Übung' },
        rightButtons: [
          {
            id: 'deleteExerciseButton',
            text: 'LÖSCHEN',
            color: 'white'
          }
        ]
      }
    };
  }

  constructor(props: IProps) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  public navigationButtonPressed(id: { buttonId: string; componentId: string }) {
    switch (id.buttonId) {
      case 'deleteExerciseButton':
        Alert.alert('Löschen bestätigen', 'Willst du diese Übung wirklich löschen?', [
          { text: 'Abbrechen', onPress: undefined, style: 'cancel' },
          {
            text: 'OK',
            onPress: () => {
              if (this.props.id !== 0) {
                this.props.deleteExercise(this.props.id);
              }
              Navigation.pop(id.componentId);
            }
          }
        ]);
        break;
      default:
        break;
    }
  }

  public componentDidAppear() {
    this.props.getExerciseById(this.props.id);
  }

  public render() {
    return (
      <ScrollView>
        <ExerciseForm
          id={this.props.exercise.id}
          name={this.props.exercise.name || ''}
          category={this.props.exercise.category || ''}
          description={this.props.exercise.description || ''}
          muscles={this.props.exercise.muscles || []}
          submit={this.props.saveExercise}
        />
      </ScrollView>
    );
  }
}

export default ExerciseAddScreen;
