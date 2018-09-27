import { FieldArray, Formik, FormikProps } from 'formik';
import React, { Fragment, PureComponent } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import TextInput from '../components/Input';
// import { ListEmptyComponent, ListItemSeperator } from '../components/ListComponents';

import { IDay, IGetDayById, ISaveDay } from '../types/dayTypes';
import { ISet } from '../types/workoutTypes';

import styles from '../styles';

interface IProps {
  getDayById: (id: number) => IGetDayById;
  saveDay: (day: IDay) => ISaveDay;
  day: IDay;
  id: number;
  isFetching: boolean;
}

interface IMyFormValues {
  description: string;
  sets: ISet[];
}

export default class DayAddScreen extends PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  public componentDidAppear() {
    this.props.getDayById(this.props.id);
  }

  public render() {
    return (
      <View style={styles.layout.main}>
        <Formik
          initialValues={{ description: this.props.day.description, sets: this.props.day.sets }}
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
              <FieldArray
                name="sets"
                render={({ push }) => (
                  <Fragment>
                    {props.values.sets.length > 0 &&
                      props.values.sets.map((set, index) => {
                        return (
                          <View>
                            <Text>test {index}</Text>
                          </View>
                        );
                      })}
                    <Button
                      title="Übung hinzufügen"
                      onPress={() => push({ id: 1, order: 1, sets: 1, exercises: [1], settings: [] })}
                    />
                  </Fragment>
                )}
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
