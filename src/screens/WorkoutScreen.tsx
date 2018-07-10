import React, { PureComponent } from 'react';
import { Alert, Button, FlatList, Text, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Navigation } from 'react-native-navigation';
import styles from '../styles';
import { IGetWorkouts, IWorkout, IWorkouts } from '../types/workoutTypes';

interface IProps {
  workouts: IWorkouts;
  getWorkouts: () => IGetWorkouts;
  componentId: string;
}

export default class WorkoutScreen extends PureComponent<IProps> {
  public componentDidMount() {
    this.props.getWorkouts();
  }

  public render() {
    return (
      <View style={styles.layout.main}>
        <TouchableHighlight
          style={styles.layout.addButtonPosition}
          onPress={() =>
            Navigation.push(this.props.componentId, {
              component: {
                name: 'WorkoutScreen.Add',
                passProps: {
                  id: 0
                }
              },
              options: {
                topBar: {
                  title: {
                    text: 'Workout hinzufügen'
                  }
                }
              }
            })
          }
        >
          <View style={styles.layout.addButton}>
            <Icon name="add" size={24} color="#ffffff" />
          </View>
        </TouchableHighlight>
        <View style={{ marginHorizontal: 16 }}>
          <Text style={styles.typography.headline}>WorkoutScreen</Text>
          <FlatList
            data={this.props.workouts.results}
            ItemSeparatorComponent={() => (
              <View style={{ backgroundColor: '#eeeeee', height: 1, width: '100%', marginVertical: 5 }} />
            )}
            keyExtractor={item => item.id.toString()}
            ListEmptyComponent={() => (
              <View>
                <Text style={styles.typography.body}>Du hast noch keine Trainigspläne angelegt. </Text>
                <Text style={styles.typography.body}>
                  Wenn du eigene Pläne erstellen willst, drücke einfach unten rechts auf das + Symbol.
                </Text>
              </View>
            )}
            renderItem={(item: { item: IWorkout }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 5, backgroundColor: 'grey' }}>
                <Text style={[styles.typography.subheader, { flex: 1, paddingLeft: 16 }]}>
                  {item.item.comment ? item.item.comment : item.item.creation_date}
                </Text>
                <Button title="Bearbeiten" onPress={() => undefined} />
                <Text> </Text>
                <Button
                  title="Löschen"
                  onPress={() =>
                    Alert.alert('Löschen', 'Möchtest du wirklich löschen?', [
                      { text: 'Abbrechen', onPress: () => undefined, style: 'cancel' },
                      { text: 'OK', onPress: () => undefined }
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
