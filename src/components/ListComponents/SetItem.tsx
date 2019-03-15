import withObservables from '@nozbe/with-observables';
import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import Exercise from '../../watermelondb/models/Exercise';
import Set from '../../watermelondb/models/Set';

interface IProps {
  set: Set;
  exercises?: Exercise[];
}

class SetItem extends PureComponent<IProps> {
  render() {
    const { set, exercises } = this.props;
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

// @ts-ignore
export default enhance(SetItem);