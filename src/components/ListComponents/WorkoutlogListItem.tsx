import { Database } from '@nozbe/watermelondb';
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-elements';
import Exercise from '../../watermelondb/models/Exercise';
import Workoutlog from '../../watermelondb/models/Workoutlog';

interface IProps {
  item: { exerciseId: string; items: Workoutlog[] };
  exercise?: Exercise;
  database?: Database;
}

const WorkoutlogListItem: FC<IProps> = ({ item, exercise }) => {
  console.log(item.exerciseId);
  return (
    <View style={styles.container}>
      <Divider />
      <Text style={styles.title}>{exercise!.name}</Text>
      {item.items.map((log, index) => (
        <View key={log.id} style={styles.line}>
          <Text style={styles.rep}>{index + 1}.</Text>
          <Text style={styles.rep}>{log.weight} kgs</Text>
          <Text style={styles.rep}>{log.reps} Reps </Text>
        </View>
      ))}
    </View>
  );
};

const enhance = withObservables<IProps, {}>(['item'], ({ item, database }) => ({
  exercise: database!.collections.get<Exercise>('exercises').findAndObserve(item.exerciseId)
}));

export default withDatabase(enhance(WorkoutlogListItem));

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16
  },
  line: {
    flexDirection: 'row'
  },
  title: {
    fontSize: 16,
    marginVertical: 16
  },
  rep: {
    marginBottom: 8,
    minWidth: '25%'
  }
});
