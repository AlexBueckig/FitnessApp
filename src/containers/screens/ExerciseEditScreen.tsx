import React, { FC } from 'react';
import { ScrollView } from 'react-native';
import Container from '../../components/Container';
import ExerciseForm from '../../components/ExerciseForm';
import Exercise, { ISaveExerciseParams } from '../../watermelondb/models/Exercise';

interface IProps {
  saveExercise: (params: ISaveExerciseParams) => void;
  exercise: Exercise;
}

const ExerciseEditScreen: FC<IProps> = ({ exercise, saveExercise }) => {
  const submit = async (params: ISaveExerciseParams) => {
    await saveExercise(params);
  };

  return (
    <ScrollView>
      <Container>
        <ExerciseForm
          name={(exercise && exercise.name) || ''}
          category={(exercise && exercise.category) || ''}
          description={(exercise && exercise.description) || ''}
          muscles={(exercise && exercise.muscles) || []}
          submit={submit}
        />
      </Container>
    </ScrollView>
  );
};

export default ExerciseEditScreen;
