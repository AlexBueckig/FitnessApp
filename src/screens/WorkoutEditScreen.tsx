import React, { PureComponent } from 'react';
import { ScrollView, View } from 'react-native';
import AddButton from '../components/AddButton';
import DayList from '../components/ListComponents/DayList';
import WorkoutAddForm from '../components/WorkoutEditForm';
import styles from '../styles';
import Day from '../watermelondb/models/Day';
import Workout, { ISaveWorkoutParams } from '../watermelondb/models/Workout';

interface IProps {
  saveWorkout: (workout: ISaveWorkoutParams) => void;
  workout?: Workout;
  days: Day[];
  onPress: () => void;
  onButtonPress: (id: string) => void;
}

class WorkoutEditScreen extends PureComponent<IProps> {
  public render() {
    const { workout, days } = this.props;
    return (
      <View style={styles.layout.main}>
        <ScrollView>
          <WorkoutAddForm
            name={(workout && workout.name) || ''}
            active={(workout && workout.active) || false}
            submit={this.handleSubmit}
          />
          <DayList onButtonPress={this.props.onButtonPress} days={days} />
        </ScrollView>
        <AddButton onPress={this.props.onPress} />
      </View>
    );
  }

  private handleSubmit = (values: ISaveWorkoutParams) => {
    this.props.saveWorkout(values);
  };
}

export default WorkoutEditScreen;
