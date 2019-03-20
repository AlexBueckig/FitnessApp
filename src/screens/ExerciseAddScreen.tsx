import React, { FC } from 'react';
import { ScrollView } from 'react-native';
import ExerciseForm from '../components/ExerciseForm';
import { ISaveExerciseParams } from '../watermelondb/models/Exercise';

interface IProps {
  saveExercise: (exercise: ISaveExerciseParams) => void;
}

const ExerciseAddScreen: FC<IProps> = ({ saveExercise }) => {
  return (
    <ScrollView>
      <ExerciseForm name="" category="" description="" muscles={[]} submit={saveExercise} />
    </ScrollView>
  );
};

export default ExerciseAddScreen;
