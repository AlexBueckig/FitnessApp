import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Divider } from 'react-native-elements';
import styles from '../styles';

export const ListItemSeperator = () => {
  return <Divider style={{ backgroundColor: '#eeeeee', marginVertical: 5 }} />;
  // return <View style={{ height: 1, backgroundColor: 'black', marginVertical: 10 }} />;
};

export const ListEmptyComponent = (isFetching: boolean) => {
  if (!isFetching) {
    return (
      <View>
        <Text style={styles.typography.body}>Du hast noch keine Trainigspläne angelegt. </Text>
        <Text style={styles.typography.body}>
          Wenn du eigene Pläne erstellen willst, drücke einfach unten rechts auf das + Symbol.
        </Text>
      </View>
    );
  } else {
    return <ActivityIndicator size="large" />;
  }
};
