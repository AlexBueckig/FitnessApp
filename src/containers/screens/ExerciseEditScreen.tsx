import React, { FC } from 'react';
import { ScrollView } from 'react-native';
import ExerciseForm from '../../components/ExerciseForm';
import Exercise, { ISaveExerciseParams } from '../../watermelondb/models/Exercise';

interface IProps {
  saveExercise: (exercise: Exercise, params: ISaveExerciseParams) => void;
  exercise: Exercise;
}

const ExerciseEditScreen: FC<IProps> = ({ exercise, saveExercise }) => {
  const submit = async (params: ISaveExerciseParams) => {
    await saveExercise(exercise, params);
  };

  return (
    <ScrollView>
      <ExerciseForm
        name={(exercise && exercise.name) || ''}
        category={(exercise && exercise.category) || ''}
        description={(exercise && exercise.description) || ''}
        muscles={(exercise && exercise.muscles) || []}
        submit={submit}
      />
    </ScrollView>
  );
};

export default ExerciseEditScreen;
