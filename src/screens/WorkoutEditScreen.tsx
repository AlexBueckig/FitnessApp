import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';
import AddButton from '../components/AddButton';
import DayList from '../components/ListComponents/DayList';
import WorkoutAddForm from '../components/WorkoutEditForm';
import styles from '../styles';
import Day from '../watermelondb/models/Day';
import Workout, { ISaveWorkoutParams } from '../watermelondb/models/Workout';

interface IProps {
  saveWorkout: (workout: ISaveWorkoutParams) => void;
  workout?: Workout;
  days: Day[];
  onPress: () => void;
  onButtonPress: (id: string) => void;
}

const WorkoutEditScreen: FC<IProps> = ({ workout, days, saveWorkout, onPress, onButtonPress }) => {
  const handleSubmit = (values: ISaveWorkoutParams) => {
    saveWorkout(values);
  };

  return (
    <View style={styles.layout.main}>
      <ScrollView>
        <WorkoutAddForm
          name={(workout && workout.name) || ''}
          active={(workout && workout.active) || false}
          submit={handleSubmit}
        />
        <DayList onButtonPress={onButtonPress} days={days} />
      </ScrollView>
      <AddButton onPress={onPress} />
    </View>
  );
};

export default WorkoutEditScreen;
