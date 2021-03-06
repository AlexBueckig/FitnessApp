import React, { FC } from 'react';
import { ScrollView } from 'react-native';
import Container from '../../components/Container';
import ExerciseForm from '../../components/ExerciseForm';
import { ISaveExerciseParams } from '../../watermelondb/models/Exercise';

interface IProps {
  addExercise: (params: ISaveExerciseParams) => void;
}

const ExerciseAddScreen: FC<IProps> = ({ addExercise }) => {
  const submit = async (params: ISaveExerciseParams) => {
    await addExercise(params);
  };

  return (
    <ScrollView>
      <Container>
        <ExerciseForm name="" category="" description="" muscles={[]} submit={submit} />
      </Container>
    </ScrollView>
  );
};

export default ExerciseAddScreen;
