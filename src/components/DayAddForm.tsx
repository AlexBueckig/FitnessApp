import { Formik, FormikActions, FormikProps } from 'formik';
import React, { PureComponent } from 'react';
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

class DayAddForm extends PureComponent<IProps> {
  public render() {
    const { days, description } = this.props;
    return (
      <Formik
        initialValues={{
          description,
          days
        }}
        onSubmit={this.handleSubmit}
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
  }

  private handleSubmit = (values: ISaveDayParams, { setSubmitting }: FormikActions<ISaveDayParams>) => {
    setSubmitting(false);
    this.props.submit(values);
  };
}

export default DayAddForm;
