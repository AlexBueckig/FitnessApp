import { Formik, FormikActions, FormikProps } from 'formik';
import React, { FC } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import * as yup from 'yup';
import { ISaveDayParams } from '../watermelondb/models/Day';
import TextInput from './FormComponents/Input';
import MultiPicker from './FormComponents/MultiPicker';

type IProps = ISaveDayParams & { submit: (values: ISaveDayParams) => void };

const items = [
  { id: 0, name: 'Montag' },
  { id: 1, name: 'Dienstag' },
  { id: 2, name: 'Mittwoch' },
  { id: 3, name: 'Donnerstag' },
  { id: 4, name: 'Freitag' },
  { id: 5, name: 'Samstag' },
  { id: 6, name: 'Sonntag' }
];

const validationSchema = yup.object().shape({
  description: yup.string().required()
});

const DayAddForm: FC<IProps> = ({ days, description, submit }) => {
  const onSubmit = (values: ISaveDayParams, { setSubmitting }: FormikActions<ISaveDayParams>) => {
    setSubmitting(false);
    submit(values);
  };

  return (
    <Formik
      initialValues={{
        description,
        days
      }}
      onSubmit={onSubmit}
      enableReinitialize={true}
      validationSchema={validationSchema}
    >
      {({ values, handleSubmit, isSubmitting, errors, touched }: FormikProps<ISaveDayParams>) => (
        <View style={{ alignItems: 'center' }}>
          <TextInput
            label="description"
            name="description"
            value={values.description}
            error={touched.description && errors.description ? errors.description : undefined}
          />
          <MultiPicker label="Tage" name="days" items={items} selectedItems={values.days} />
          <Button
            title="Submit"
            onPress={handleSubmit}
            disabled={isSubmitting}
            containerStyle={{ height: 40 }}
            buttonStyle={{ backgroundColor: 'rgba(78, 116, 289, 1)' }}
            titleStyle={{ color: 'white', marginHorizontal: 20 }}
            loading={isSubmitting}
          />
        </View>
      )}
    </Formik>
  );
};

export default DayAddForm;
