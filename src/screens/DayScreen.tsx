import React, { PureComponent } from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import { Divider, ListItem } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import AddButton from '../components/AddButton';
import { ListEmptyComponent } from '../components/ListComponents';
import styles from '../styles';
import { IDay, IDays, IDeleteDay, IGetDays } from '../types/dayTypes';

interface IProps {
  days: IDays;
  getDays: () => IGetDays;
  deleteDay: (id: number) => IDeleteDay;
  componentId: string;
  isFetching: boolean;
}

export default class DayScreen extends PureComponent<IProps> {
  public static options() {
    return {
      topBar: {
        title: { text: 'Tagespläne' }
      }
    };
  }

  constructor(props: IProps) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  public componentDidAppear() {
    this.props.getDays();
  }

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
        <AddButton onPress={this.onPress.bind(this, 0)} />
      </View>
    );
  }

  private onPress(id: number) {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'DayScreen.Add',
        passProps: {
          id
        }
      }
    });
  }

  private renderItem({ item }: ListRenderItemInfo<IDay>) {
    return (
      <ListItem key={item.id} title={item.description} chevron={true} onPress={this.onPress.bind(this, item.id)} />
    );
  }

  private keyExtractor(item: IDay) {
    return item.id.toString();
  }
}
