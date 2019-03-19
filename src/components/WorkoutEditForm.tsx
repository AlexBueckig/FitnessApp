import { Formik, FormikActions, FormikProps } from 'formik';
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import * as yup from 'yup';
import { ISaveWorkoutParams } from '../watermelondb/models/Workout';
import TextInput from './FormComponents/Input';

const validationSchema = yup.object().shape({
  name: yup.string().required()
});

type IProps = ISaveWorkoutParams & { submit: (workout: ISaveWorkoutParams) => void };

class WorkoutAddForm extends PureComponent<IProps> {
  render() {
    const { name, active } = this.props;
    return (
      <Formik
        initialValues={{
          name,
          active
        }}
        onSubmit={this.handleSubmit}
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
  }

  private handleSubmit = (values: ISaveWorkoutParams, { setSubmitting }: FormikActions<ISaveWorkoutParams>) => {
    setSubmitting(false);
    this.props.submit(values);
  };
}

export default WorkoutAddForm;
