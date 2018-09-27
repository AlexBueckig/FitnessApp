import { Formik, FormikProps } from 'formik';
import React, { Fragment, PureComponent } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import TextInput from '../components/Input';
import styles from '../styles';
import { IExercise, IGetExerciseById, ISaveExercise } from '../types/exerciseTypes';

interface IProps {
  getExerciseById: (id: number) => IGetExerciseById;
  saveWorkout: (exercise: IExercise) => ISaveExercise;
  exercise: IExercise;
  id: number;
  isFetching: boolean;
}

interface IMyFormValues {
  name: string;
}

class WorkoutAddScreen extends PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  static get options() {
    return {
      topBar: {
        title: { text: 'Übung' },
        rightButtons: [
          {
            id: 'saveWorkoutButton',
            icon: require('../../res/images/one.png')
          }
        ]
      }
    };
  }

  public onNavigationButtonPressed(buttonId: string) {
    switch (buttonId) {
      case 'saveExerciseButton':
        // this.props.saveWorkout({ ...this.props.workout, comment: this.props.values });
        break;
      default:
        break;
    }
  }

  public componentDidAppear() {
    this.props.getExerciseById(this.props.id);
  }

  public render() {
    return (
      <View style={styles.layout.main}>
        <Formik
          initialValues={{ name: this.props.exercise.name }}
          onSubmit={this.handleSubmit.bind(this)}
          render={(props: FormikProps<IMyFormValues>) => (
            <Fragment>
              <TextInput
                label="comment"
                name="comment"
                value={props.values.name}
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
    this.props.saveWorkout({ ...this.props.exercise, name: values.name });
  }
}

export default WorkoutAddScreen;
