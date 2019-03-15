import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import Day from '../../watermelondb/models/Day';
import DayListItem from './DayListItem';

interface IProps {
  days: Day[];
  onButtonPress: (id: string) => void;
}

const DayList: FC<IProps> = props => {
  return (
    <View style={styles.container}>
      {props.days.map(day => (
        <DayListItem onPress={props.onButtonPress} key={day.id} day={day} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 16 }
});

export default DayList;
