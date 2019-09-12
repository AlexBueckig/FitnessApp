import { Formik, FormikActions, FormikProps } from 'formik';
import React, { FC, useState } from 'react';
import { Picker, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { IAddExerciseParams } from '../watermelondb/models/Day';
import Exercise from '../watermelondb/models/Exercise';

interface IProps {
  submit: (values: IAddExerciseParams) => void;
  exercises: Exercise[];
}

const processExercises = (exercises: Exercise[]) => {
  const processedExercises: { [key: string]: Exercise[] } = {};
  exercises.map(exercise => {
    if (!processedExercises[exercise.category]) {
      processedExercises[exercise.category] = [];
    }
    processedExercises[exercise.category].push(exercise);
  });
  return Object.entries(processedExercises).map(([key, value]) => ({ title: key, data: value }));
};

const DayAddExerciseForm: FC<IProps> = ({ submit, exercises }) => {
  const [selectedCategory, setSelectedCatgegory] = useState(0);
  const [selectedExercise, setSelectedExercise] = useState(0);

  const onCategoryChange = (value: number) => {
    setSelectedCatgegory(value);
  };

  const onExerciseChange = (value: number) => {
    setSelectedExercise(value);
  };

  const onSubmit = (values: IAddExerciseParams, { setSubmitting }: FormikActions<IAddExerciseParams>) => {
    setSubmitting(false);
    submit({ exerciseId: groupedExercises[selectedCategory].data[selectedExercise].id });
  };

  const groupedExercises = processExercises(exercises);

  if (exercises.length === 0) {
    return <Text>Keine Übungen vorhanden...</Text>;
  }

  return (
    <Formik initialValues={{ exerciseId: '' }} onSubmit={onSubmit}>
      {({ handleSubmit }: FormikProps<IAddExerciseParams>) => (
        <View>
          <Picker selectedValue={selectedCategory} onValueChange={onCategoryChange} mode={'dialog'}>
            {groupedExercises.map((category, index) => (
              <Picker.Item key={`${index}${category.title}`} value={index} label={category.title} />
            ))}
          </Picker>
          <Picker selectedValue={selectedExercise} onValueChange={onExerciseChange}>
            {groupedExercises[selectedCategory].data.map((exercise, index) => (
              <Picker.Item key={exercise.id} value={index} label={exercise.name} />
            ))}
          </Picker>
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

export default DayAddExerciseForm;
