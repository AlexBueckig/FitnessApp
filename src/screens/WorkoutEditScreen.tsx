import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';
import AddButton from '../components/AddButton';
import DayList from '../components/ListComponents/DayList';
import WorkoutEditForm from '../components/WorkoutEditForm';
import styles from '../styles';
import Day from '../watermelondb/models/Day';
import Workout, { ISaveWorkoutParams } from '../watermelondb/models/Workout';

interface IProps {
  saveWorkout: (workout: ISaveWorkoutParams) => void;
  workout: Workout;
  days: Day[];
  onDayAdd: () => void;
  onDayEdit: (id: string) => void;
  onDayDelete: (day: Day) => void;
}

const WorkoutEditScreen: FC<IProps> = ({ workout, days, saveWorkout, onDayAdd, onDayEdit, onDayDelete }) => {
  const handleSubmit = (values: ISaveWorkoutParams) => {
    saveWorkout(values);
  };

  return (
    <View style={styles.layout.main}>
      <ScrollView>
        <WorkoutEditForm name={workout.name} active={workout.active} submit={handleSubmit} />
        <DayList onEdit={onDayEdit} onDelete={onDayDelete} days={days} />
      </ScrollView>
      <AddButton onPress={onDayAdd} />
    </View>
  );
};

export default WorkoutEditScreen;
