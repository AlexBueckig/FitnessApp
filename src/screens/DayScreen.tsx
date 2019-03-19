import React, { PureComponent } from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import { Divider, ListItem } from 'react-native-elements';
import AddButton from '../components/AddButton';
import { ListEmptyComponent } from '../components/ListComponents';
import styles from '../styles';
import { IDay, IDays } from '../types/dayTypes';

interface IProps {
  days: IDays;
}

export default class DayScreen extends PureComponent<IProps> {
  public render() {
    return (
      <View style={styles.layout.main}>
        <FlatList
          data={this.props.days.results}
          ItemSeparatorComponent={Divider}
          keyExtractor={this.keyExtractor}
          ListEmptyComponent={ListEmptyComponent}
          renderItem={this.renderItem.bind(this)}
        />
        <AddButton onPress={this.onPress} />
      </View>
    );
  }

  private onPress = () => {
    console.log('Test');
  };

  private renderItem({ item }: ListRenderItemInfo<IDay>) {
    return (
      <ListItem
        key={item.id}
        title={item.description}
        chevron={{ name: 'chevron-right', size: 26 }}
        onPress={this.onPress.bind(this, item.id)}
      />
    );
  }

  private keyExtractor(item: IDay) {
    return item.id.toString();
  }
}
