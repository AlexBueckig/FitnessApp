import { Database } from '@nozbe/watermelondb';
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import React, { PureComponent } from 'react';
import { Navigation } from 'react-native-navigation';
import { compose } from 'recompose';
import Day from '../watermelondb/models/Day';
import Exercise from '../watermelondb/models/Exercise';
import Workout from '../watermelondb/models/Workout';
import CurrentWorkoutDayScreen from './screens/CurrentWorkoutDayScreen';

interface IProps {
  componentId: string;
  workoutId: string;
  dayId: string;
  date?: string;
  workout?: Workout;
  day?: Day;
  exercises?: Exercise[];
  database?: Database;
}

export class CurrentWorkoutDayContainer extends PureComponent<IProps> {
  static get options() {
    return {};
  }

  constructor(props: IProps) {
    super(props);
    Navigation.events().bindComponent(this);
    Navigation.mergeOptions(this.props.componentId, {
      topBar: { title: { text: `${this.props.workout!.name} (${this.props.day!.description})` } }
    });
  }

  onPress = (exerciseId: string) => {
    Navigation.push(this.props.componentId, {
      component: { name: 'CurrentWorkoutExerciseScreen', passProps: { exerciseId, date: this.props.date } }
    });
  };

  render() {
    const { workout, day, exercises, date } = this.props;
    return (
      <CurrentWorkoutDayScreen
        workout={workout!}
        day={day!}
        exercises={exercises!}
        onPress={this.onPress}
        date={date!}
      />
    );
  }
}

const enhance = compose<IProps, {}>(
  withObservables<IProps, {}>(['workoutId', 'dayId'], ({ workoutId, dayId, database }) => ({
    workout: database!.collections.get('workouts').findAndObserve(workoutId),
    day: database!.collections.get('days').findAndObserve(dayId)
  })),
  withObservables<IProps, {}>(['day'], ({ day }) => ({
    exercises: day!.exercises
  }))
);

export default withDatabase(enhance(CurrentWorkoutDayContainer));
