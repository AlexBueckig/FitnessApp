import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Navigation } from 'react-native-navigation';
import WorkoutAddScreen from '../screens/WorkoutEditScreen';
import { iconsMap } from '../utils/AppIcons';
import { RootModel } from '../watermelondb';
import { ISaveWorkoutParams } from '../watermelondb/models/Workout';

interface IProps {
  id: string;
  componentId: string;
  workout: undefined;
}

export default class WorkoutAddContainer extends Component<IProps> {
  public static options() {
    return {
      topBar: {
        title: { text: 'Workout anlegen' },
        rightButtons: [
          {
            id: 'deleteWorkoutButton',
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

  saveWorkout = async (values: ISaveWorkoutParams) => {
    await RootModel.createWorkout(values.name);
  };

  render() {
    return <WorkoutAddScreen workout={this.props.workout} saveWorkout={this.saveWorkout} days={[]} />;
  }

  public navigationButtonPressed(id: { buttonId: string; componentId: string }) {
    switch (id.buttonId) {
      case 'deleteWorkoutButton':
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
