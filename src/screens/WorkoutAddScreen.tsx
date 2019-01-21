import React, { PureComponent } from 'react';
import { Alert, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import WorkoutAddForm from '../components/WorkoutAddForm';
import styles from '../styles';
import { IDeleteWorkout, IGetWorkoutById, ISaveWorkout, IWorkout } from '../types/workoutTypes';
import { iconsMap } from '../utils/AppIcons';

interface IProps {
  getWorkoutById: (id: number) => IGetWorkoutById;
  saveWorkout: (workout: IWorkout) => ISaveWorkout;
  deleteWorkout: (id: number) => IDeleteWorkout;
  workout: IWorkout;
  id: number;
  isFetching: boolean;
}

class WorkoutAddScreen extends PureComponent<IProps> {
  public static options() {
    return {
      topBar: {
        title: { text: 'Trainingsplan' },
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

  public navigationButtonPressed(id: { buttonId: string; componentId: string }) {
    switch (id.buttonId) {
      case 'deleteWorkoutButton':
        Alert.alert('Löschen bestätigen', 'Willst du diesen Plan wirklich löschen?', [
          { text: 'Abbrechen', onPress: undefined, style: 'cancel' },
          {
            text: 'OK',
            onPress: () => {
              if (this.props.id !== 0) {
                this.props.deleteWorkout(this.props.id);
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
    this.props.getWorkoutById(this.props.id);
  }

  public render() {
    return (
      <View style={styles.layout.main}>
        <WorkoutAddForm workout={this.props.workout} handleSubmit={this.handleSubmit} />
      </View>
    );
  }

  public handleSubmit = (values: IWorkout) => {
    this.props.saveWorkout({ ...values });
  };
}

export default WorkoutAddScreen;
