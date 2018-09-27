import React, { PureComponent } from 'react';
import { Alert, Button, FlatList, TouchableHighlight, View } from 'react-native';
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Navigation } from 'react-native-navigation';
import { ListEmptyComponent, ListItemSeperator } from '../components/ListComponents';
import styles from '../styles';
import { IDays, IDeleteDay, IGetDays } from '../types/dayTypes';

interface IProps {
  days: IDays;
  getDays: () => IGetDays;
  deleteDay: (id: number) => IDeleteDay;
  componentId: string;
  isFetching: boolean;
}

export default class DayScreen extends PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  public componentDidAppear() {
    this.props.getDays();
  }

  public onPress(id: number) {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'DayScreen.Add',
        passProps: {
          id
        }
      }
    });
  }

  public render() {
    return (
      <View style={styles.layout.main}>
        <TouchableHighlight style={styles.layout.addButtonPosition} onPress={this.onPress.bind(this, 0)}>
          <View style={styles.layout.addButton}>
            <Icon name="add" size={24} color="#ffffff" />
          </View>
        </TouchableHighlight>
        <View style={{ marginHorizontal: 16 }}>
          <Text style={styles.typography.headline}>DayScreen</Text>
          <FlatList
            data={this.props.days.results}
            ItemSeparatorComponent={ListItemSeperator}
            keyExtractor={item => item.id.toString()}
            ListEmptyComponent={ListEmptyComponent(this.props.isFetching)}
            renderItem={({ item }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 5, backgroundColor: 'grey' }}>
                <Text style={[styles.typography.subheader, { flex: 1, paddingLeft: 16 }]}>{item.description}</Text>
                <Button
                  title="Bearbeiten"
                  // icon={<Icon name="edit" size={28} color="white" />}
                  onPress={this.onPress.bind(this, item.id)}
                />
                <Text> </Text>
                <Button
                  // icon={<Icon name="delete" size={28} color="white" />}
                  title="Löschen"
                  onPress={() =>
                    Alert.alert('Löschen', `Möchtest du ${item.description} wirklich löschen?`, [
                      { text: 'Abbrechen', onPress: () => undefined, style: 'cancel' },
                      { text: 'OK', onPress: () => this.props.deleteDay(item.id) }
                    ])
                  }
                />
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}
