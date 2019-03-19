import withObservables from '@nozbe/with-observables';
import React, { FC } from 'react';
import { ListItem } from 'react-native-elements';
import Workout from '../../watermelondb/models/Workout';

interface IProps {
  workout: Workout;
  onPress: (id: string) => void;
}

const RawListItem: FC<IProps> = props => {
  const { workout } = props;
  return (
    <ListItem
      key={workout.id}
      title={workout.name}
      chevron={{ name: 'chevron-right', size: 26 }}
      onPress={props.onPress.bind(null, workout.id)}
    />
  );
};

const enhance = withObservables(['workout'], ({ workout }: any) => ({ workout: workout.observe() }));

export default enhance(RawListItem);
