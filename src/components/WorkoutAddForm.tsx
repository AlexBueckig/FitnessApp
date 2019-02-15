import { Formik, FormikProps } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import * as yup from 'yup';
import { IWorkout } from '../types/workoutTypes';
import TextInput from './FormComponents/Input';

const validationSchema = yup.object().shape({
  comment: yup.string().required()
});

interface IProps {
  workout: IWorkout;
  handleSubmit: (values: IWorkout) => void;
}

const WorkoutAddForm = (props: IProps) => {
  return (
    <Formik
      initialValues={{ ...props.workout }}
      onSubmit={props.handleSubmit}
      enableReinitialize={true}
      validationSchema={validationSchema}
    >
      {({ values, isSubmitting, isValid, submitForm, errors, touched }: FormikProps<IWorkout>) => (
        <View>
          <TextInput
            label="comment"
            name="comment"
            value={values.comment}
            error={touched.comment && errors.comment ? errors.comment : undefined}
          />
          <Button title="Submit" onPress={submitForm} disabled={!isValid || isSubmitting} loading={isSubmitting} />
        </View>
      )}
    </Formik>
  );
};

export default WorkoutAddForm;
