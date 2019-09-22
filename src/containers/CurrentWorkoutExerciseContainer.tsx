import { Database, Q } from '@nozbe/watermelondb';
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import React, { PureComponent } from 'react';
import { Navigation } from 'react-native-navigation';
import Exercise from '../watermelondb/models/Exercise';
import Workoutlog from '../watermelondb/models/Workoutlog';
import CurrentWorkoutExerciseScreen from './screens/CurrentWorkoutExerciseScreen';

interface IProps {
  date: string;
  exerciseId: string;
  exercise?: Exercise;
  sets?: Workoutlog[];
  database?: Database;
  componentId: string;
}

export class CurrentWorkoutExerciseContainer extends PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  render() {
    const { date, exercise, sets } = this.props;
    const title = exercise ? exercise.name : '';

    Navigation.mergeOptions(this.props.componentId, { topBar: { title: { text: title } } });

    return <CurrentWorkoutExerciseScreen date={date} exercise={exercise!} sets={sets || []} />;
  }
}

const enhance = withObservables<IProps, {}>(['exerciseId'], ({ exerciseId, database, date }) => ({
  exercise: database!.collections.get('exercises').findAndObserve(exerciseId),
  sets: database!.collections
    .get<Workoutlog>('workoutlog')
    .query(Q.where('exercise_id', exerciseId), Q.where('training_day', date))
}));

export default withDatabase(enhance(CurrentWorkoutExerciseContainer));
