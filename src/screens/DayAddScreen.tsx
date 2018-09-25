import { Formik, FormikProps } from 'formik';
import React, { Fragment, PureComponent } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import TextInput from '../components/Input';

import { IDay, ISaveDay } from '../types/dayTypes';

import styles from '../styles';

interface IProps {
  day: IDay;
  saveDay: (workout: IDay) => ISaveDay;
}

interface IMyFormValues {
  description: string;
}

export default class DayAddScreen extends PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  public componentDidAppear() {
    console.log('TrainingScreen did appear!');
  }

  public render() {
    return (
      <View style={styles.layout.main}>
        {' '}
        <Formik
          initialValues={{ description: this.props.day.description }}
          onSubmit={this.handleSubmit.bind(this)}
          render={(props: FormikProps<IMyFormValues>) => (
            <Fragment>
              <TextInput
                label="description"
                name="description"
                value={props.values.description}
                onChange={props.setFieldValue}
                onTouch={props.setFieldTouched}
                // error={props.touched.comment && props.errors.comment}
              />
              <Button
                title="Submit"
                onPress={props.submitForm}
                disabled={!props.isValid || props.isSubmitting}
                loading={props.isSubmitting}
              />
            </Fragment>
          )}
          enableReinitialize={true}
        />
      </View>
    );
  }

  public handleSubmit(values: IMyFormValues) {
    this.props.saveDay({ ...this.props.day, description: values.description });
  }
}
