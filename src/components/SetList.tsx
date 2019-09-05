import React, { FC, Fragment, useState } from 'react';
import { Dimensions, FlatList, ListRenderItemInfo, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import Set from '../watermelondb/models/Set';
import Workout from '../watermelondb/models/Workout';
import SetListItem from './ListComponents/SetListItem';
import Pagination from './Pagination';

interface IProps {
  sets: Set[];
  workout: Workout;
}

const SetList: FC<IProps> = ({ sets }) => {
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
        data={sets}
        renderItem={(item: ListRenderItemInfo<Set>) => <SetListItem set={item.item} />}
        horizontal={true}
        decelerationRate={0}
        snapToInterval={width} // your element width
        snapToAlignment={'center'}
        keyExtractor={(item: Set) => item.id}
        onScroll={onScroll}
        showsHorizontalScrollIndicator={false}
      />
      <Pagination index={index} dots={sets.length} />
    </Fragment>
  );
};

export default SetList;
