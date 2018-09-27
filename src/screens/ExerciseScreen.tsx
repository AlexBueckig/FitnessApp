import React, { PureComponent } from 'react';
import { Alert, Button, FlatList, TouchableHighlight, View } from 'react-native';
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Navigation } from 'react-native-navigation';
import { ListEmptyComponent, ListItemSeperator } from '../components/ListComponents';
import styles from '../styles';
import { IDeleteExercise, IExercises, IGetExercises } from '../types/exerciseTypes';

interface IProps {
  exercises: IExercises;
  getExercises: () => IGetExercises;
  deleteExercise: (id: number) => IDeleteExercise;
  componentId: string;
  isFetching: boolean;
}

export default class ExerciseScreen extends PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  public componentDidAppear() {
    this.props.getExercises();
  }

  public onPress(id: number) {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'ExerciseScreen.Add',
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
          <Text style={styles.typography.headline}>ExerciseScreen</Text>
          <FlatList
            data={this.props.exercises.results}
            ItemSeparatorComponent={ListItemSeperator}
            keyExtractor={item => item.id.toString()}
            ListEmptyComponent={ListEmptyComponent(this.props.isFetching)}
            renderItem={({ item }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 5, backgroundColor: 'grey' }}>
                <Text style={[styles.typography.subheader, { flex: 1, paddingLeft: 16 }]}>
                  {item.name ? item.name : item.description}
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
                      `Möchtest du ${item.name ? item.name : item.description} wirklich löschen?`,
                      [
                        { text: 'Abbrechen', onPress: () => undefined, style: 'cancel' },
                        { text: 'OK', onPress: () => this.props.deleteExercise(item.id) }
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
