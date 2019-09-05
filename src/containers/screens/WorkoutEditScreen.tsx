import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-elements';
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
      <ScrollView style={{ padding: 16 }}>
        <Text style={{ fontSize: 20, textAlign: 'center' }}>{workout.name}</Text>
        <DayList onEdit={onDayEdit} onDelete={onDayDelete} days={days} />
      </ScrollView>
      <AddButton onPress={onDayAdd} />
    </View>
  );
};

export default WorkoutEditScreen;
