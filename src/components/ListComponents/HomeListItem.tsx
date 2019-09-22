import withObservables from '@nozbe/with-observables';
import dayjs from 'dayjs';
import React, { FC } from 'react';
import { ListItem } from 'react-native-elements';
import styles from '../../styles';
import Day from '../../watermelondb/models/Day';
import Workout from '../../watermelondb/models/Workout';

interface IProps {
  weekday: number;
  day: Day;
  onPress: (workoutId: string, dayId: string, date: string) => void;
  workout?: Workout;
}

const HomeListItem: FC<IProps> = ({ weekday, day, workout, onPress }) => {
  const handlePress = () => {
    onPress(workout!.id, day.id, date);
  };

  const date =
    +weekday === dayjs().day()
      ? `${dayjs().format('DD.MM.YYYY')}`
      : +weekday === (dayjs().day() + 1) % 7
      ? `${dayjs()
          .add(1, 'day')
          .format('DD.MM.YYYY')}`
      : `${dayjs()
          .add((weekday - dayjs().day() + 7) % 7, 'day')
          .format('DD.MM.YYYY')}`;

  const title =
    +weekday === dayjs().day()
      ? `Heute, ${dayjs().format('DD.MM.YYYY')}`
      : +weekday === (dayjs().day() + 1) % 7
      ? `Morgen, ${dayjs()
          .add(1, 'day')
          .format('DD.MM.YYYY')}`
      : `${dayjs()
          .day(weekday)
          .format('dddd')}, ${dayjs()
          .add((weekday - dayjs().day() + 7) % 7, 'day')
          .format('DD.MM.YYYY')}`;

  return (
    <ListItem
      title={title}
      subtitle={`${day.description} - ${workout!.name}`}
      chevron={{ name: 'chevron-right', size: 26 }}
      titleStyle={styles.typography.listItemTitle}
      subtitleStyle={styles.typography.listItemSubtitle}
      onPress={handlePress}
    />
  );
};

const enhance = withObservables<IProps, {}>([], ({ day }) => ({
  day,
  workout: day.workout
}));

export default enhance(HomeListItem);
