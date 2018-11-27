import { Formik } from 'formik';
import React, { PureComponent } from 'react';
import { ScrollView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import * as yup from 'yup';
import ExerciseForm from '../components/ExerciseForm';
import styles from '../styles';
import { IExercise, IGetExerciseById, ISaveExercise } from '../types/exerciseTypes';

interface IProps {
  getExerciseById: (id: number) => IGetExerciseById;
  saveExercise: (exercise: IExercise) => ISaveExercise;
  exercise: IExercise;
  id: number;
  isFetching: boolean;
}

interface IState {
  muscles: number[];
}

interface IMyFormValues {
  name: string;
  category: string;
  description: string;
  muscles: number[];
}

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .min(3)
    .max(255),
  category: yup.string().required()
});

class ExerciseAddScreen extends PureComponent<IProps, IState> {
  static get options() {
    return {
      topBar: {
        title: { text: 'Übung' },
        rightButtons: [
          {
            id: 'deleteExerciseButton',
            text: 'DELETE',
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
    console.log(id);
    switch (id.buttonId) {
      case 'deleteExerciseButton':
        console.log('DeleteButton pressed');
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
      <ScrollView style={styles.layout.main}>
        <Formik
          initialValues={{
            name: this.props.exercise.name,
            category: this.props.exercise.category || '',
            description: this.props.exercise.description || '',
            muscles: this.props.exercise.muscles || []
          }}
          onSubmit={this.handleSubmit.bind(this)}
          render={ExerciseForm}
          enableReinitialize={true}
          validationSchema={validationSchema}
        />
      </ScrollView>
    );
  }

  public handleSubmit(values: IMyFormValues) {
    this.props.saveExercise({ id: this.props.id, ...values });
  }
}

export default ExerciseAddScreen;
