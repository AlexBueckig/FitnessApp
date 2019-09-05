import { FieldArray, Formik, FormikActions, FormikProps } from 'formik';
import React, { FC, Fragment, useState } from 'react';
import { Picker, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import Exercise from '../watermelondb/models/Exercise';
import { ISaveSetParams } from '../watermelondb/models/Set';
import TextInput from './FormComponents/Input';

interface IProps {
  submit: (values: ISaveSetParams) => void;
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

  const onSubmit = (values: ISaveSetParams, { setSubmitting }: FormikActions<ISaveSetParams>) => {
    setSubmitting(false);
    values.sets = +values.sets;
    submit(values);
  };

  const groupedExercises = processExercises(exercises);

  if (exercises.length === 0) {
    return <Text>Keine Übungen vorhanden...</Text>;
  }

  return (
    <Formik initialValues={{ sets: 0, exercises: [] }} onSubmit={onSubmit}>
      {({ handleSubmit, values }: FormikProps<ISaveSetParams>) => (
        <View>
          <TextInput value={`${values.sets}`} name="sets" label="Sets" />
          <FieldArray name="exercises">
            {arrayHelpers => (
              <Fragment>
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
                <Button
                  title="Übung hinzufügen"
                  onPress={() => arrayHelpers.push(groupedExercises[selectedCategory].data[selectedExercise].id)}
                  containerStyle={{ height: 40 }}
                  buttonStyle={{ backgroundColor: 'rgba(78, 116, 289, 1)' }}
                  titleStyle={{ color: 'white', marginHorizontal: 20 }}
                />
              </Fragment>
            )}
          </FieldArray>
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

export default DayAddExerciseForm;
