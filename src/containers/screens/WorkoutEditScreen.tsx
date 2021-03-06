import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';
import AddButton from '../../components/AddButton';
import DayList from '../../components/ListComponents/DayList';
import Day from '../../watermelondb/models/Day';
import Workout from '../../watermelondb/models/Workout';

interface IProps {
  workout: Workout;
  days: Day[];
  onDayAdd: () => void;
  onDayEdit: (id: string) => void;
  onDayDelete: (day: Day) => void;
}

const WorkoutEditScreen: FC<IProps> = ({ workout, days, onDayAdd, onDayEdit, onDayDelete }) => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ paddingHorizontal: 16 }}>
        <DayList onEdit={onDayEdit} onDelete={onDayDelete} days={days} />
      </ScrollView>
      <AddButton onPress={onDayAdd} />
    </View>
  );
};

export default WorkoutEditScreen;
