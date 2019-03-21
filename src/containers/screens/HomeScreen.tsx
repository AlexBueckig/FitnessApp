import React, { FC, useState } from 'react';
import { Animated, FlatList } from 'react-native';
import { Divider, ListItem, Text } from 'react-native-elements';
import ImageQuoteCard from '../../components/ImageQuoteCard';
import styles from '../../styles';
import Workout from '../../watermelondb/models/Workout';

interface IProps {
  workouts: Workout[];
  quote: { text: string; author: string; backgroundUrl?: string };
  componentId?: string;
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const HomeScreen: FC<IProps> = ({ workouts, quote }) => {
  const [offsetY, setOffsetY] = useState(new Animated.Value(0));

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
        <ImageQuoteCard {...quote} />
      </Animated.View>
      <Text style={{ padding: 16, backgroundColor: '#53D0A4', color: 'white', fontSize: 16 }}>
        Meine kommenden Workouts
      </Text>
    </Animated.View>
  );

  return (
    <AnimatedFlatList
      ListHeaderComponent={listHeaderComponent}
      data={workouts}
      renderItem={(item: { item: Workout }) => {
        return (
          <ListItem
            title={`Montag, ${item.item.id}. Januar`}
            subtitle="2er Split - Oberkörper"
            chevron={{ name: 'chevron-right', size: 26 }}
            titleStyle={styles.typography.listItemTitle}
            subtitleStyle={styles.typography.listItemSubtitle}
          />
        );
      }}
      ItemSeparatorComponent={Divider}
      ListEmptyComponent={() => <Text style={{ marginBottom: 2000 }}>Leer...</Text>}
      keyExtractor={(item: Workout) => `HomeScreen${item.id}`}
      stickyHeaderIndices={[0]}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: offsetY } } }], {
        useNativeDriver: true
      })}
    />
  );
};

export default HomeScreen;
