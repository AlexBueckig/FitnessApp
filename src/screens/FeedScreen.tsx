import React, { PureComponent } from 'react';
import { Animated, FlatList, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import styles from '../styles/';
import { IGetFeed, IPost } from '../types/feedTypes';

interface IProps {
  posts: IPost[];
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
    Navigation.events().bindComponent(this);
  }

  public componentDidAppear() {
    this.props.getPosts();
  }

  public render() {
    return (
      <View style={styles.layout.main}>
        <Animated.Image
          style={[
            styles.layout.backgroundImage,
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
          ListHeaderComponent={() => <View style={styles.layout.spacer} />}
          data={this.props.posts}
          renderItem={(item: { item: IPost }) => {
            return (
              <View style={[styles.layout.container, styles.layout.flexrow]}>
                <View style={styles.layout.roundView} />
                <View style={styles.layout.card}>
                  <Text style={styles.typography.title}>{item.item.text}</Text>
                  <Text style={styles.typography.body}>Das ist ein Beispieltext!</Text>
                </View>
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
