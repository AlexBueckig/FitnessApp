import React, { Component } from 'react';
import { Alert, ToastAndroid } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { iconsMap } from '../utils/AppIcons';
import { RootModel } from '../watermelondb';
import { ISaveExerciseParams } from '../watermelondb/models/Exercise';
import ExerciseAddScreen from './screens/ExerciseAddScreen';

interface IProps {
  id: string;
  componentId: string;
  exercise: undefined;
}

export default class ExerciseAddContainer extends Component<IProps> {
  public static options() {
    return {
      topBar: {
        title: { text: 'Übung anlegen' },
        rightButtons: [
          {
            id: 'deleteExerciseButton',
            text: 'LÖSCHEN',
            color: 'white',
            icon: iconsMap.delete
          }
        ]
      }
    };
  }

  constructor(props: IProps) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  addExercise = async (values: ISaveExerciseParams) => {
    await RootModel.createExercise(values.name, values.description, values.category, values.muscles);
    ToastAndroid.show('Übung gespeichert!', ToastAndroid.SHORT);
    Navigation.pop(this.props.componentId);
  };

  render() {
    return <ExerciseAddScreen addExercise={this.addExercise} />;
  }

  navigationButtonPressed(id: { buttonId: string; componentId: string }) {
    switch (id.buttonId) {
      case 'deleteExerciseButton':
        Alert.alert('Löschen bestätigen', 'Willst du diese Übung wirklich löschen?', [
          { text: 'Abbrechen', onPress: undefined, style: 'cancel' },
          {
            text: 'OK',
            onPress: () => {
              Navigation.pop(id.componentId);
            }
          }
        ]);
        break;
      default:
        break;
    }
  }
}
