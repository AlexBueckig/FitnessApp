import dayjs from 'dayjs';
import { Formik, FormikActions, FormikProps } from 'formik';
import React, { FC } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import * as yup from 'yup';
import { ISaveDayParams } from '../watermelondb/models/Day';
import TextInput from './FormComponents/Input';
import MultiPicker from './FormComponents/MultiPicker';

type IProps = ISaveDayParams & { submit: (values: ISaveDayParams) => void };

const validationSchema = yup.object().shape({
  description: yup.string().required()
});

const DayAddForm: FC<IProps> = ({ days, description, submit }) => {
  const items = [
    {
      id: 1,
      name: dayjs()
        .day(1)
        .format('dddd')
    },
    {
      id: 2,
      name: dayjs()
        .day(2)
        .format('dddd')
    },
    {
      id: 3,
      name: dayjs()
        .day(3)
        .format('dddd')
    },
    {
      id: 4,
      name: dayjs()
        .day(4)
        .format('dddd')
    },
    {
      id: 5,
      name: dayjs()
        .day(5)
        .format('dddd')
    },
    {
      id: 6,
      name: dayjs()
        .day(6)
        .format('dddd')
    },
    {
      id: 0,
      name: dayjs()
        .day(0)
        .format('dddd')
    }
  ];

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
