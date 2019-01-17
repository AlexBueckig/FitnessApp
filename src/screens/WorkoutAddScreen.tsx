import { Formik, FormikProps } from 'formik';
import React, { Fragment, PureComponent } from 'react';
import { Alert, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import TextInput from '../components/Input';
import styles from '../styles';
import { IDeleteWorkout, IGetWorkoutById, ISaveWorkout, IWorkout } from '../types/workoutTypes';

interface IProps {
  getWorkoutById: (id: number) => IGetWorkoutById;
  saveWorkout: (workout: IWorkout) => ISaveWorkout;
  deleteWorkout: (id: number) => IDeleteWorkout;
  workout: IWorkout;
  id: number;
  isFetching: boolean;
}

interface IMyFormValues {
  comment: string;
}

class WorkoutAddScreen extends PureComponent<IProps> {
  public static options() {
    return {
      topBar: {
        title: { text: 'Trainingsplan' },
        rightButtons: [
          {
            id: 'deleteWorkoutButton',
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

  public navigationButtonPressed(id: { buttonId: string; componentId: string }) {
    switch (id.buttonId) {
      case 'deleteWorkoutButton':
        Alert.alert('Löschen bestätigen', 'Willst du diesen Plan wirklich löschen?', [
          { text: 'Abbrechen', onPress: undefined, style: 'cancel' },
          {
            text: 'OK',
            onPress: () => {
              if (this.props.id !== 0) {
                this.props.deleteWorkout(this.props.id);
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
