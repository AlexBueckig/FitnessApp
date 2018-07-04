import React, { PureComponent } from 'react';
import { Alert, Button, FlatList, Text, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from '../styles';

interface IWorkoutItem {
  key: string;
  value: string;
}

export default class WorkoutScreen extends PureComponent {
  public render() {
    return (
      <View style={styles.layout.main}>
        <TouchableHighlight style={styles.layout.addButtonPosition}>
          <View style={styles.layout.addButton}>
            <Icon name="add" size={24} color="#ffffff" />
          </View>
        </TouchableHighlight>
        <View style={{ marginHorizontal: 16 }}>
          <Text style={styles.typography.headline}>WorkoutScreen</Text>
          <FlatList
            data={[
              { key: 'a', value: 'test1' },
              { key: 'b', value: 'test2' },
              { key: 'c', value: 'test3' },
              { key: 'd', value: 'test4' },
              { key: 'e', value: 'test5' }
            ]}
            ItemSeparatorComponent={() => (
              <View style={{ backgroundColor: '#eeeeee', height: 1, width: '100%', marginVertical: 5 }} />
            )}
            keyExtractor={(item: IWorkoutItem) => item.key}
            ListEmptyComponent={() => (
              <View>
                <Text style={styles.typography.body}>Du hast noch keine Trainigspläne angelegt. </Text>
                <Text style={styles.typography.body}>
                  Wenn du eigene Pläne erstellen willst, drücke einfach unten rechts auf das + Symbol.
                </Text>
              </View>
            )}
            renderItem={(item: { item: IWorkoutItem }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 5, backgroundColor: 'grey' }}>
                <Text style={[styles.typography.subheader, { flex: 1, paddingLeft: 16 }]}>{item.item.value}</Text>
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
