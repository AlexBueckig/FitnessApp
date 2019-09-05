import { Database } from '@nozbe/watermelondb';
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Navigation, OptionsModalPresentationStyle } from 'react-native-navigation';
import { compose } from 'recompose';
import { iconsMap } from '../utils/AppIcons';
import Day from '../watermelondb/models/Day';
import Workout, { ISaveWorkoutParams } from '../watermelondb/models/Workout';
import WorkoutEditScreen from './screens/WorkoutEditScreen';

interface IProps {
  id: string;
  componentId: string;
  workout: Workout;
  days: Day[];
  database: Database;
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
          },
          {
            id: 'editWorkoutButton',
            text: 'BEARBEITEN',
            color: 'white',
            icon: iconsMap.edit
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
    return (
      <WorkoutEditScreen
        workout={this.props.workout}
        days={this.props.days}
        onDayAdd={this.showDayModal}
        onDayEdit={this.onDayEdit}
        onDayDelete={this.onDayDelete}
      />
    );
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
            },
            style: 'destructive'
          }
        ]);
        break;
      case 'editWorkoutButton':
        this.showWorkoutModal();
        break;
      default:
        break;
    }
  }

  private showDayModal = () => {
    Navigation.showModal({
      component: {
        name: 'DayAddModal',
        passProps: {
          id: this.props.workout.id,
          parentComponentId: this.props.componentId
        },
        options: {
          layout: {
            backgroundColor: 'rgba(0,0,0,0.7)'
          },
          modalPresentationStyle: OptionsModalPresentationStyle.overCurrentContext
        }
      }
    });
  };

  private showWorkoutModal = () => {
    Navigation.showModal({
      component: {
        name: 'WorkoutEditModal',
        passProps: {
          id: this.props.workout.id,
          parentComponentId: this.props.componentId
        },
        options: {
          layout: {
            backgroundColor: 'rgba(0,0,0,0.7)'
          },
          modalPresentationStyle: OptionsModalPresentationStyle.overCurrentContext
        }
      }
    });
  };

  private onDayEdit = (id: string) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'DayScreen.Edit',
        passProps: {
          id
        }
      }
    });
  };

  private onDayDelete = (day: Day) => {
    day.deleteEntry();
  };
}

const enhance = compose<IProps, {}>(
  withObservables<IProps>([], ({ database, id }) => ({
    workout: database.collections.get<Workout>('workouts').findAndObserve(id)
  })),
  withObservables<IProps>(['workout'], ({ workout }) => ({
    days: workout.days.observe()
  }))
);

export default withDatabase(enhance(WorkoutEditContainer));
