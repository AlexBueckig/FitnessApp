import { Formik, FormikProps } from 'formik';
import React, { Fragment, PureComponent } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import TextInput from '../components/Input';
import styles from '../styles';
import { IGetWorkoutById, ISaveWorkout, IWorkout } from '../types/workoutTypes';

interface IProps {
  getWorkoutById: (id: number) => IGetWorkoutById;
  saveWorkout: (workout: IWorkout) => ISaveWorkout;
  workout: IWorkout;
  id: number;
  isFetching: boolean;
}

interface IMyFormValues {
  comment: string;
}

class WorkoutAddScreen extends PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);
    Navigation.events().bindComponent(this);
  }
  static get options() {
    return {
      topBar: {
        title: { text: 'Trainingsplan' },
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
      case 'saveWorkoutButton':
        // this.props.saveWorkout({ ...this.props.workout, comment: this.props.values });
        break;
      default:
        break;
    }
  }

  public componentDidAppear() {
    this.props.getWorkoutById(this.props.id);
  }

  public render() {
    return (
      <View style={styles.layout.main}>
        <Formik
          initialValues={{ comment: this.props.workout.comment }}
          onSubmit={this.handleSubmit.bind(this)}
          render={(props: FormikProps<IMyFormValues>) => (
            <Fragment>
              <TextInput
                label="comment"
                name="comment"
                value={props.values.comment}
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
    this.props.saveWorkout({ ...this.props.workout, comment: values.comment });
  }
}

export default WorkoutAddScreen;
