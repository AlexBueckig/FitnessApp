import { Database, Q } from '@nozbe/watermelondb';
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import React, { FC } from 'react';
import { ListItem } from 'react-native-elements';
import Exercise from '../../watermelondb/models/Exercise';
import Workoutlog from '../../watermelondb/models/Workoutlog';

interface IProps {
  exercise: Exercise;
  onPress: (exerciseId: string) => void;
  date: string;
  database?: Database;
  setCount?: number;
}

const CurrentWorkoutListItem: FC<IProps> = ({ exercise, onPress, setCount }) => {
  const handlePress = () => {
    onPress(exercise.id);
  };

  return (
    <ListItem
      title={`${exercise.name} - ${setCount} Sätze`}
      onPress={handlePress}
      chevron={{ name: 'chevron-right', size: 26 }}
    />
  );
};

const enhance = withObservables<IProps, {}>(['exercise'], ({ exercise, date, database }) => ({
  setCount: database!.collections
    .get<Workoutlog>('workoutlog')
    .query(Q.where('exercise_id', exercise.id), Q.where('training_day', date))
    .observeCount()
}));

export default withDatabase(enhance(CurrentWorkoutListItem));
