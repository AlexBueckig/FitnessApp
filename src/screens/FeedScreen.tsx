import React, { PureComponent } from 'react';
import { Dimensions, FlatList, ImageBackground, ScrollView, View } from 'react-native';
import { Divider, ListItem, Text } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
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
      <ScrollView>
        <ImageBackground
          source={require('../../res/images/athlet-ausbildung-ausrustungen-305239.jpg')}
          style={{ height: 200, width: Dimensions.get('window').width }}
          resizeMode={'cover'}
        >
          <View
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', flex: 1, justifyContent: 'center', paddingHorizontal: 32 }}
          >
            <Text style={{ color: '#EEEEEE', fontSize: 22, lineHeight: 36, fontStyle: 'italic' }}>
              "If you have dreams it is your responsibility to make them happen."
            </Text>
            <Text style={{ color: '#CCCCCC', alignSelf: 'flex-end', marginRight: 32 }}>- Bel Pesce</Text>
          </View>
        </ImageBackground>
        <FlatList
          ListHeaderComponent={() => (
            <Text style={{ padding: 16, backgroundColor: '#53D0A4', color: 'white', fontSize: 16 }}>
              Meine kommenden Workouts
            </Text>
          )}
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
      </ScrollView>
    );
  }
}
