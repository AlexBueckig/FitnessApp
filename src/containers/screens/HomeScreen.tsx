import React, { FC } from 'react';
import { Animated, FlatList, ListRenderItemInfo } from 'react-native';
import { Divider, Text } from 'react-native-elements';
import ImageQuoteCard from '../../components/ImageQuoteCard';
import HomeListItem from '../../components/ListComponents/HomeListItem';
import Day from '../../watermelondb/models/Day';

interface IProps {
  weekdays: Array<{ weekday: string; day: Day }>;
  onPress: (workoutId: string, dayId: string) => void;
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const HomeScreen: FC<IProps> = ({ weekdays, onPress }) => {
  const offsetY = new Animated.Value(0);

  const renderItem = ({ item: { day, weekday } }: ListRenderItemInfo<{ weekday: number; day: Day }>) => (
    <HomeListItem day={day} weekday={weekday} onPress={onPress} />
  );

  const listHeaderComponent = () => (
    <Animated.View
      style={{
        transform: [
          {
            translateY: offsetY.interpolate({
              inputRange: [0, 200],
              outputRange: [0, -200],
              extrapolateRight: 'clamp'
            })
          }
        ]
      }}
    >
      <Animated.View
        style={{
          transform: [
            {
              scale: offsetY.interpolate({
                inputRange: [-200, 0, 1],
                outputRange: [1.4, 1, 1]
              })
            }
          ],
          opacity: offsetY.interpolate({
            inputRange: [0, 200],
            outputRange: [1, 0],
            extrapolateRight: 'clamp'
          })
        }}
      >
        <ImageQuoteCard />
      </Animated.View>
      <Text style={{ padding: 16, backgroundColor: '#53D0A4', color: 'white', fontSize: 16 }}>
        Meine kommenden Workouts
      </Text>
    </Animated.View>
  );

  return (
    <AnimatedFlatList
      ListHeaderComponent={listHeaderComponent}
      data={weekdays}
      renderItem={renderItem}
      ItemSeparatorComponent={Divider}
      ListEmptyComponent={() => <Text style={{ marginBottom: 2000 }}>Leer...</Text>}
      keyExtractor={(item: { weekday: number; day: Day }) => `HomeScreen${item.weekday}${item.day.id}`}
      stickyHeaderIndices={[0]}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: offsetY } } }], {
        useNativeDriver: true
      })}
    />
  );
};

export default HomeScreen;
