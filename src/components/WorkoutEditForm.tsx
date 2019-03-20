import { Formik, FormikActions, FormikProps } from 'formik';
import React, { FC } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import * as yup from 'yup';
import { ISaveWorkoutParams } from '../watermelondb/models/Workout';
import TextInput from './FormComponents/Input';

const validationSchema = yup.object().shape({
  name: yup.string().required()
});

type IProps = ISaveWorkoutParams & { submit: (workout: ISaveWorkoutParams) => void };

const WorkoutEditForm: FC<IProps> = props => {
  const { name, active } = props;

  const onSubmit = (values: ISaveWorkoutParams, { setSubmitting }: FormikActions<ISaveWorkoutParams>) => {
    setSubmitting(false);
    props.submit(values);
  };

  return (
    <Formik
      initialValues={{
        name,
        active
      }}
      onSubmit={onSubmit}
      enableReinitialize={true}
      validationSchema={validationSchema}
    >
      {({ values, isSubmitting, handleSubmit, errors, touched }: FormikProps<ISaveWorkoutParams>) => {
        return (
          <View>
            <TextInput
              label="name"
              name="name"
              value={values.name}
              error={touched.name && errors.name ? errors.name : undefined}
            />
            <Button title="Submit" onPress={handleSubmit} disabled={isSubmitting} loading={isSubmitting} />
          </View>
        );
      }}
    </Formik>
  );
};

export default WorkoutEditForm;
