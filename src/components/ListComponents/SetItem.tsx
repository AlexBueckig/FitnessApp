import withObservables from '@nozbe/with-observables';
import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import Exercise from '../../watermelondb/models/Exercise';

interface IProps {
  exercise: Exercise;
  exercises?: Exercise[];
}

class SetItem extends PureComponent<IProps> {
  render() {
    const { exercise, exercises } = this.props;
    return (
      <View style={styles.container}>
        {exercises!.map(exercise => (
          <Text key={exercise.id}>{exercise.name}</Text>
        ))}
      </View>
    );
  }
}

export { SetItem };

const enhance = withObservables(['set'], ({ set }: IProps) => ({
  set: set.observe(),
  setExercises: set.setExercises.observe(),
  exercises: set.exercises.observe()
}));

const styles = StyleSheet.create({
  container: {
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});

export default enhance(SetItem);
