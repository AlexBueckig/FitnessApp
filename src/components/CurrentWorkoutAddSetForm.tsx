import { Formik, FormikActions } from 'formik';
import React, { FC } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { RootModel } from '../watermelondb';
import Exercise from '../watermelondb/models/Exercise';
import TextInput from './FormComponents/Input';

interface IProps {
  date: string;
  exercise: Exercise;
}

interface IValues {
  reps: string;
  weight: string;
}

const CurrentWorkoutAddSetForm: FC<IProps> = ({ exercise, date }) => {
  const handleSubmit = async (values: IValues, { setSubmitting }: FormikActions<IValues>) => {
    setSubmitting(false);
    const result = await RootModel.createLogEntry(+values.reps, +values.weight, exercise, date);
  };

  return (
    <Formik initialValues={{ reps: '0', weight: '0' }} onSubmit={handleSubmit}>
      {({ values, submitForm }) => (
        <View style={{ alignItems: 'flex-end' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TextInput
              style={{ flex: 1 }}
              value={values.reps}
              label="Wiederholungen"
              name="reps"
              keyboardType={'numeric'}
            />
            <TextInput
              style={{ flex: 1, marginLeft: 32 }}
              value={values.weight}
              label="Gewicht"
              name="weight"
              keyboardType={'numeric'}
            />
          </View>
          <Button title="Satz eintragen" onPress={submitForm} />
        </View>
      )}
    </Formik>
  );
};

export default CurrentWorkoutAddSetForm;
