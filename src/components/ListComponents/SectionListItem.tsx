import withObservables from '@nozbe/with-observables';
import React, { FC } from 'react';
import { ListItem } from 'react-native-elements';
import Exercise from '../../watermelondb/models/Exercise';

interface IProps {
  exercise: Exercise;
  onPress: (id: string) => void;
}

const RawSectionListItem: FC<IProps> = props => {
  const { exercise } = props;

  return (
    <ListItem
      key={exercise.id}
      title={exercise.name}
      chevron={{ name: 'chevron-right', size: 26 }}
      onPress={props.onPress.bind(null, exercise.id)}
    />
  );
};

export default withObservables(['exercise'], ({ exercise }: any) => ({ exercise: exercise.observe() }))(
  RawSectionListItem
);
