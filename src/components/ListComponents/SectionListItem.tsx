import withObservables from '@nozbe/with-observables';
import React, { SFC } from 'react';
import { ListItem } from 'react-native-elements';
import Exercise from '../../watermelondb/models/Exercise';

interface IProps {
  exercise: Exercise;
  onPress: (id: string) => void;
}

const RawSectionListItem: SFC<IProps> = props => {
  const { exercise } = props;
  const onPress = () => {
    props.onPress(exercise.id);
  };
  return (
    <ListItem key={exercise.id} title={exercise.name} chevron={{ name: 'chevron-right', size: 26 }} onPress={onPress} />
  );
};

export default withObservables(['exercise'], ({ exercise }: any) => ({ exercise: exercise.observe() }))(
  RawSectionListItem
);
