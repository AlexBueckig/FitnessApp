import React, { PureComponent } from 'react';
import { Animated, FlatList } from 'react-native';
import { Divider, ListItem, Text } from 'react-native-elements';
import ImageQuoteCard from '../components/ImageQuoteCard';
import styles from '../styles';
import { IPost } from '../types/feedTypes';
import Workout from '../watermelondb/models/Workout';

interface IProps {
  workouts: Workout[];
  componentId?: string;
}

interface IState {
  offsetY: Animated.Value;
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class HomeScreen extends PureComponent<IProps, IState> {
  state = { offsetY: new Animated.Value(0) };

  public render() {
    const { workouts } = this.props;
    return (
      <AnimatedFlatList
        ListHeaderComponent={this.listHeaderComponent}
        data={workouts}
        renderItem={(item: { item: IPost }) => {
          return (
            <ListItem
              title={`Montag, ${item.item.key}. Januar`}
              subtitle="2er Split - Oberkörper"
              chevron={{ name: 'chevron-right', size: 26 }}
              titleStyle={styles.typography.listItemTitle}
              subtitleStyle={styles.typography.listItemSubtitle}
            />
          );
        }}
        ItemSeparatorComponent={Divider}
        keyExtractor={(item: Workout) => `HomeScreen${item.id}`}
        stickyHeaderIndices={[0]}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.offsetY } } }], {
          useNativeDriver: true
        })}
      />
    );
  }

  private listHeaderComponent = () => (
    <Animated.View
      style={{
        transform: [
          {
            translateY: this.state.offsetY.interpolate({
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
              scale: this.state.offsetY.interpolate({
                inputRange: [-200, 0, 1],
                outputRange: [1.4, 1, 1]
              })
            }
          ],
          opacity: this.state.offsetY.interpolate({
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
}
