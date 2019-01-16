import { FieldArray, Formik, FormikProps } from 'formik';
import React, { Fragment, PureComponent } from 'react';
import { Alert, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import TextInput from '../components/Input';
// import { ListEmptyComponent, ListItemSeperator } from '../components/ListComponents';

import { IDay, IDeleteDay, IGetDayById, ISaveDay } from '../types/dayTypes';
import { ISet } from '../types/workoutTypes';

import styles from '../styles';

interface IProps {
  getDayById: (id: number) => IGetDayById;
  saveDay: (day: IDay) => ISaveDay;
  deleteDay: (id: number) => IDeleteDay;
  day: IDay;
  id: number;
  isFetching: boolean;
}

interface IMyFormValues {
  description: string;
  sets: ISet[];
}

export default class DayAddScreen extends PureComponent<IProps> {
  static get options() {
    return {
      topBar: {
        title: { text: 'Trainingsplan' },
        rightButtons: [
          {
            id: 'deleteDayButton',
            text: 'LÖSCHEN',
            color: 'white'
          }
        ]
      }
    };
  }

  constructor(props: IProps) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  public componentDidAppear() {
    this.props.getDayById(this.props.id);
  }

  public navigationButtonPressed(id: { buttonId: string; componentId: string }) {
    switch (id.buttonId) {
      case 'deleteDayButton':
        Alert.alert('Löschen bestätigen', 'Willst du diesen Tag wirklich löschen?', [
          { text: 'Abbrechen', onPress: undefined, style: 'cancel' },
          {
            text: 'OK',
            onPress: () => {
              if (this.props.id !== 0) {
                this.props.deleteDay(this.props.id);
              }
              Navigation.pop(id.componentId);
            }
          }
        ]);
        break;
      default:
        break;
    }
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
                          <View key={index}>
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
