import React, { FC, Fragment } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { Divider } from 'react-native-elements';
import CurrentWorkoutListItem from '../../components/ListComponents/CurrentWorkoutListItem';
import Day from '../../watermelondb/models/Day';
import Exercise from '../../watermelondb/models/Exercise';
import Workout from '../../watermelondb/models/Workout';

interface IProps {
  workout: Workout;
  day: Day;
  date: string;
  exercises: Exercise[];
  onPress: (exerciseId: string) => void;
}

const CurrentWorkoutDayScreen: FC<IProps> = ({ exercises, onPress, date }) => {
  const renderItem = ({ item }: ListRenderItemInfo<Exercise>) => (
    <CurrentWorkoutListItem exercise={item} onPress={onPress} date={date} />
  );

  return (
    <Fragment>
      <FlatList data={exercises} renderItem={renderItem} ItemSeparatorComponent={() => <Divider />} />
    </Fragment>
  );
};

export default CurrentWorkoutDayScreen;
