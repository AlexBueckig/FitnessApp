import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { Navigation, OptionsModalPresentationStyle } from 'react-native-navigation';
import DayList from '../components/ListComponents/DayList';
import WorkoutAddForm from '../components/WorkoutEditForm';
import styles from '../styles';
import Day from '../watermelondb/models/Day';
import Workout, { ISaveWorkoutParams } from '../watermelondb/models/Workout';

interface IProps {
  saveWorkout: (workout: ISaveWorkoutParams) => void;
  workout?: Workout;
  days: Day[];
}

class WorkoutAddScreen extends PureComponent<IProps> {
  public render() {
    const { workout, days } = this.props;
    return (
      <View style={styles.layout.main}>
        <WorkoutAddForm
          name={(workout && workout.name) || ''}
          active={(workout && workout.active) || false}
          submit={this.handleSubmit}
        />
        <DayList days={days} />
        <Button title="Modaltest" onPress={this.showDayModal} />
      </View>
    );
  }

  private handleSubmit = (values: ISaveWorkoutParams) => {
    this.props.saveWorkout(values);
  };

  private showDayModal = () => {
    Navigation.showModal({
      component: {
        name: 'DayAddModal',
        passProps: {
          id: this.props.workout!.id
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
}

export default WorkoutAddScreen;
