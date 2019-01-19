import React, { PureComponent } from 'react';
import { FlatList, Image, View } from 'react-native';
import { Divider, ListItem, Text } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import styles from '../styles/';
import { IGetFeed, IPost } from '../types/feedTypes';

interface IProps {
  posts: IPost[];
  componentId?: string;
  getPosts: () => IGetFeed;
}

export default class FeedScreen extends PureComponent<IProps> {
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
  }

  public componentDidAppear() {
    this.props.getPosts();
  }

  public render() {
    return (
      <View style={styles.layout.main}>
        <Image source={require('../../res/images/bg2.jpg')} style={{ height: 256 }} />
        <FlatList
          ListHeaderComponent={() => <Text style={{ margin: 16 }}>Test</Text>}
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
          keyExtractor={(item: IPost) => JSON.stringify(item.key)}
        />
      </View>
    );
  }
}
