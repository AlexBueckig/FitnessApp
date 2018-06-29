import React, { PureComponent } from 'react';
import { Animated, ListView, ListViewDataSource, Text, View } from 'react-native';
import styles from '../styles/styles';
import { IGetFeed, posts as postType } from '../types/feedTypes';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const data = [
  { key: 'a', text: 'Card 1' },
  { key: 'b', text: 'Card 2' },
  { key: 'c', text: 'Card 3' },
  { key: 'd', text: 'Card 4' },
  { key: 'e', text: 'Card 5' },
  { key: 'f', text: 'Card 6' },
  { key: 'g', text: 'Card 7' },
  { key: 'h', text: 'Card 8' },
  { key: 'i', text: 'Card 9' }
];

interface IProps {
  posts: postType;
  componentId?: string;
  getPosts: () => IGetFeed;
}

interface IState {
  scrollY: Animated.Value;
  dataSource: ListViewDataSource;
}

export default class FeedScreen extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      dataSource: ds.cloneWithRows(data),
      scrollY: new Animated.Value(0)
    };
  }

  public componentDidMount() {
    // this.props.getPosts();
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
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          renderHeader={this.renderHeader.bind(this)}
          renderScrollComponent={this.renderScroll.bind(this)}
        />
      </View>
    );
  }
  public renderRow(row: { key: string; text: string }) {
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{row.text}</Text>
      </View>
    );
  }
  public renderHeader() {
    return <View style={styles.header} />;
  }
  public renderScroll(props: IProps) {
    return (
      <Animated.ScrollView
        {...props}
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
    );
  }
}
