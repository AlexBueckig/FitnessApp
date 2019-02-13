import React, { PureComponent } from 'react';
import { Animated, FlatList } from 'react-native';
import { Divider, ListItem, Text } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import ImageQuoteCard from '../components/ImageQuoteCard';
import { IGetFeed, IPost } from '../types/feedTypes';

interface IProps {
  posts: IPost[];
  componentId?: string;
  getPosts: () => IGetFeed;
}

interface IState {
  offsetY: Animated.Value;
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class FeedScreen extends PureComponent<IProps, IState> {
  public static options() {
    return {
      topBar: {
        title: { text: 'Home' }
      }
    };
  }

  constructor(props: IProps) {
    super(props);
    Navigation.events().bindComponent(this);
    this.state = { offsetY: new Animated.Value(0) };
  }

  public componentDidAppear() {
    this.props.getPosts();
  }

  public render() {
    return (
      <AnimatedFlatList
        ListHeaderComponent={this.listHeaderComponent}
        data={this.props.posts}
        renderItem={(item: { item: IPost }) => {
          return (
            <ListItem
              title={`Montag, ${item.item.key}. Januar`}
              subtitle="2er Split - Oberkörper"
              chevron={{ name: 'chevron-right', size: 26 }}
            />
          );
        }}
        ItemSeparatorComponent={Divider}
        keyExtractor={(item: IPost) => JSON.stringify(item)}
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
