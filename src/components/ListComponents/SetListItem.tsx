import withObservables from '@nozbe/with-observables';
import React, { FC } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { compose } from 'recompose';
import Exercise from '../../watermelondb/models/Exercise';
import Set from '../../watermelondb/models/Set';
import SetListItemForm from '../SetListItemForm';

interface IProps {
  set: Set;
  exercise?: Exercise[];
}

const SetListItem: FC<IProps> = ({ set, exercise }) => {
  if (exercise) {
    return (
      <View
        style={{
          backgroundColor: 'red',
          borderRadius: 2,
          width: Dimensions.get('window').width - 32,
          marginHorizontal: 16,
          marginTop: 16,
          padding: 8,
          elevation: 1,
          flex: 1
        }}
      >
        <Text>{exercise.length > 0 ? exercise[0].name : 'Keine Übung :('}</Text>
        <SetListItemForm set={set} />
      </View>
    );
  } else {
    return null;
  }
};

const enhance = compose<IProps, IProps>(
  withObservables<IProps>(['set'], ({ set }) => ({ set: set.observe() })),
  withObservables<IProps>(['set'], ({ set }) => ({ exercise: set.exercises.observe() }))
);

export default enhance(SetListItem);
