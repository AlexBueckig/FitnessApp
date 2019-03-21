import React, { FC } from 'react';
import { ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import AddButton from '../../components/AddButton';
import Container from '../../components/Container';
import DayList from '../../components/ListComponents/DayList';
import Day from '../../watermelondb/models/Day';
import Workout, { ISaveWorkoutParams } from '../../watermelondb/models/Workout';

interface IProps {
  saveWorkout: (workout: ISaveWorkoutParams) => void;
  workout: Workout;
  days: Day[];
  onDayAdd: () => void;
  onDayEdit: (id: string) => void;
  onDayDelete: (day: Day) => void;
}

const WorkoutEditScreen: FC<IProps> = ({ workout, days, saveWorkout, onDayAdd, onDayEdit, onDayDelete }) => {
  return (
    <Container>
      <ScrollView>
        <Text style={{ marginTop: 8, fontSize: 20, textAlign: 'center' }}>{workout.name}</Text>
        <DayList onEdit={onDayEdit} onDelete={onDayDelete} days={days} />
      </ScrollView>
      <AddButton onPress={onDayAdd} />
    </Container>
  );
};

export default WorkoutEditScreen;
