import { DatabaseProviderProps, withDatabase } from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { compose } from 'recompose';
import WorkoutAddScreen from '../screens/WorkoutEditScreen';
import { iconsMap } from '../utils/AppIcons';
import Day from '../watermelondb/models/Day';
import Workout, { ISaveWorkoutParams } from '../watermelondb/models/Workout';

interface IProps {
  id: string;
  componentId: string;
  workout: Workout;
  days: Day[];
}

export class WorkoutEditContainer extends Component<IProps> {
  public static options() {
    return {
      topBar: {
        title: { text: 'Übung bearbeiten' },
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
    await this.props.workout.updateEntry(values);
  };

  render() {
    return <WorkoutAddScreen workout={this.props.workout} saveWorkout={this.saveWorkout} days={this.props.days} />;
  }

  public navigationButtonPressed(id: { buttonId: string; componentId: string }) {
    switch (id.buttonId) {
      case 'deleteWorkoutButton':
        Alert.alert('Löschen bestätigen', 'Willst du diese Übung wirklich löschen?', [
          { text: 'Abbrechen', onPress: undefined, style: 'cancel' },
          {
            text: 'OK',
            onPress: async () => {
              await this.props.workout.deleteEntry();
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

const enhance = compose(
  withObservables([], ({ database, id }: IProps & DatabaseProviderProps) => ({
    workout: database.collections.get<Workout>('workouts').findAndObserve(id)
  })),
  withObservables(['workout'], ({ workout }: IProps & DatabaseProviderProps) => ({
    days: workout.days.observe()
  }))
);

// @ts-ignore
export default withDatabase(enhance(WorkoutEditContainer));
