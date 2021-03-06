import withObservables from '@nozbe/with-observables';
import React, { FC } from 'react';
import { ListItem } from 'react-native-elements';
import Exercise from '../../watermelondb/models/Exercise';

interface IProps {
  exercise: Exercise;
  onPress: (id: string) => void;
}

const RawSectionListItem: FC<IProps> = ({ exercise, onPress }) => {
  const onEdit = () => {
    onPress(exercise.id);
  };

  return (
    <ListItem key={exercise.id} title={exercise.name} chevron={{ name: 'chevron-right', size: 26 }} onPress={onEdit} />
  );
};

export default withObservables<IProps, {}>(['exercise'], ({ exercise }) => ({ exercise: exercise.observe() }))(
  RawSectionListItem
);
