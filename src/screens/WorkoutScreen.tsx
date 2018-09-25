import React, { PureComponent } from 'react';
import { Alert, Button, FlatList, TouchableHighlight, View } from 'react-native';
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Navigation } from 'react-native-navigation';
import { ListEmptyComponent, ListItemSeperator } from '../components/ListComponents';
import styles from '../styles';
import { IDeleteWorkout, IGetWorkouts, IWorkouts } from '../types/workoutTypes';

interface IProps {
  workouts: IWorkouts;
  getWorkouts: () => IGetWorkouts;
  deleteWorkout: (id: number) => IDeleteWorkout;
  componentId: string;
  isFetching: boolean;
}

export default class WorkoutScreen extends PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  public componentDidAppear() {
    this.props.getWorkouts();
  }

  public onPress(id: number) {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'WorkoutScreen.Add',
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
          <Text style={styles.typography.headline}>WorkoutScreen</Text>
          <FlatList
            data={this.props.workouts.results}
            ItemSeparatorComponent={ListItemSeperator}
            keyExtractor={item => item.id.toString()}
            ListEmptyComponent={ListEmptyComponent(this.props.isFetching)}
            renderItem={({ item }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 5, backgroundColor: 'grey' }}>
                <Text style={[styles.typography.subheader, { flex: 1, paddingLeft: 16 }]}>
                  {item.comment ? item.comment : item.creation_date}
                </Text>
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
                    Alert.alert(
                      'Löschen',
                      `Möchtest du ${item.comment ? item.comment : item.creation_date} wirklich löschen?`,
                      [
                        { text: 'Abbrechen', onPress: () => undefined, style: 'cancel' },
                        { text: 'OK', onPress: () => this.props.deleteWorkout(item.id) }
                      ]
                    )
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
