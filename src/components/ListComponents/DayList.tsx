import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import Day from '../../watermelondb/models/Day';
import DayListItem from './DayListItem';

interface IProps {
  days: Day[];
  onEdit: (id: string) => void;
  onDelete: (day: Day) => void;
}

const DayList: FC<IProps> = ({ days, onEdit, onDelete }) => {
  return (
    <View style={styles.container}>
      {days.map(day => (
        <DayListItem onEdit={onEdit} onDelete={onDelete} key={day.id} day={day} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 16 }
});

export default DayList;
