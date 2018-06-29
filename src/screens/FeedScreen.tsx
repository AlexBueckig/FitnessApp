import React, { PureComponent } from 'react';
import { Animated, FlatList, Text, View } from 'react-native';
import styles from '../styles/styles';
import { IGetFeed, IPost, posts as postType } from '../types/feedTypes';

interface IProps {
  posts: postType;
  componentId?: string;
  getPosts: () => IGetFeed;
}

interface IState {
  scrollY: Animated.Value;
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class FeedScreen extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0)
    };
  }

  public componentDidMount() {
    this.props.getPosts();
  }

  public render() {
    return (
      <View style={styles.container}>
        <Animated.Image
          style={[
            styles.backgroundImage,
            {
              opacity: this.state.scrollY.interpolate({
                inputRange: [0, 250],
                outputRange: [1, 0]
              }),
              transform: [
                {
                  scale: this.state.scrollY.interpolate({
                    inputRange: [-200, 0, 1],
                    outputRange: [1.4, 1, 1]
                  })
                }
              ]
            }
          ]}
          source={require('../../res/images/bg2.jpg')}
        />
        <AnimatedFlatList
          ListHeaderComponent={() => <View style={styles.header} />}
          data={this.props.posts}
          renderItem={(item: { item: IPost }) => {
            return (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.item.text}</Text>
              </View>
            );
          }}
          keyExtractor={(item: IPost) => item.key}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { y: this.state.scrollY } }
              }
            ],
            {
              useNativeDriver: true
            }
          )}
        />
      </View>
    );
  }
}
