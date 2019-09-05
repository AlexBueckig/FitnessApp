import withObservables from '@nozbe/with-observables';
import React, { FC } from 'react';
import { ListItem } from 'react-native-elements';
import Workout from '../../watermelondb/models/Workout';

interface IProps {
  workout: Workout;
  onPress: (id: string) => void;
}

const RawListItem: FC<IProps> = ({ workout, onPress }) => {
  const onListItemPress = () => {
    onPress(workout.id);
  };

  const onLongPress = () => {
    workout.updateEntry({ name: workout.name, active: !workout.active });
  };

  return (
    <ListItem
      key={workout.id}
      title={workout.name}
      chevron={{ name: 'chevron-right', size: 26 }}
      onPress={onListItemPress}
      onLongPress={onLongPress}
      badge={
        workout.active
          ? {
              value: 'aktiv',
              badgeStyle: { paddingHorizontal: 5, paddingVertical: 10, justifyContent: 'center', alignItems: 'center' }
            }
          : undefined
      }
    />
  );
};

const enhance = withObservables(['workout'], ({ workout }: any) => ({ workout: workout.observe() }));

export default enhance(RawListItem);
