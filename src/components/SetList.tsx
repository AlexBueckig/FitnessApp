import React, { FC, Fragment, useState } from 'react';
import { Dimensions, FlatList, ListRenderItemInfo, NativeScrollEvent, NativeSyntheticEvent, Text } from 'react-native';
import Exercise from '../watermelondb/models/Exercise';
import Workout from '../watermelondb/models/Workout';
import Pagination from './Pagination';

interface IProps {
  exercises: Exercise[];
  workout: Workout;
}

const ExercisesList: FC<IProps> = ({ exercises }) => {
  const [index, setIndex] = useState(0);
  const { width } = Dimensions.get('window');

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentIndex = Math.floor((event.nativeEvent.contentOffset.x + width / 2) / width);
    if (currentIndex !== index) {
      setIndex(currentIndex);
    }
  };
  return (
    <Fragment>
      <FlatList
        data={exercises}
        renderItem={(item: ListRenderItemInfo<Exercise>) => <Text>{item.item.name}</Text>}
        horizontal={true}
        decelerationRate={0}
        snapToInterval={width} // your element width
        snapToAlignment={'center'}
        keyExtractor={(item: Exercise) => item.id}
        onScroll={onScroll}
        showsHorizontalScrollIndicator={false}
      />
      <Pagination index={index} dots={exercises.length} />
    </Fragment>
  );
};

export default ExercisesList;
