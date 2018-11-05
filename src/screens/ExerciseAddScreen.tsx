import { Formik, FormikProps } from 'formik';
import React, { PureComponent } from 'react';
import { ScrollView, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import CategoryPicker from '../components/CategoryPicker';
import TextInput from '../components/Input';
import MultiPicker from '../components/MultiPicker';
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
  category: string;
  description: string;
  muscles: number[];
}

class ExerciseAddScreen extends PureComponent<IProps> {
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

  private muscleGroups = [
    {
      name: 'Anterior deltoid',
      id: 2
    },
    {
      name: 'Biceps brachii (Armbeuger)',
      id: 1
    },
    {
      name: 'Biceps femoris (Beinbeuger)',
      id: 11
    },
    {
      name: 'Brachialis (Oberarmmuskel)',
      id: 13
    },
    {
      name: 'Gastrocnemius (Waden)',
      id: 7
    },
    {
      name: 'Gluteus maximus (Po)',
      id: 8
    },
    {
      name: 'Latissimus dorsi (breiter Rückenmuskel)',
      id: 12
    },
    {
      name: 'Obliquus externus abdominis (schräger Bauchmuskel)',
      id: 14
    },
    {
      name: 'Pectoralis major (Brustmuskel)',
      id: 4
    },
    {
      name: 'Quadriceps femoris (Oberschenkelstrecker)',
      id: 10
    },
    {
      name: 'Rectus abdominis (Bauchmuskel)',
      id: 6
    },
    {
      name: 'Serratus anterior',
      id: 3
    },
    {
      name: 'Soleus',
      id: 15
    },
    {
      name: 'Trapezius',
      id: 9
    },
    {
      name: 'Triceps brachii (Armstrecker)',
      id: 5
    }
  ];
  constructor(props: IProps) {
    super(props);
    Navigation.events().bindComponent(this);
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
      <ScrollView style={styles.layout.main}>
        <Formik
          initialValues={{
            name: this.props.exercise.name,
            category: this.props.exercise.category || '',
            description: this.props.exercise.description || '',
            muscles: this.props.exercise.muscles || []
          }}
          onSubmit={this.handleSubmit.bind(this)}
          render={(props: FormikProps<IMyFormValues>) => (
            <View>
              <TextInput
                label="Name"
                name="name"
                placeholder="Name der Übung"
                value={props.values.name}
                onChange={props.setFieldValue}
                onTouch={props.setFieldTouched}
                // error={props.touched.comment && props.errors.comment}
              />
              <TextInput
                label="Beschreibung"
                name="description"
                placeholder="optional"
                value={props.values.description}
                onChange={props.setFieldValue}
                onTouch={props.setFieldTouched}
                // error={props.touched.comment && props.errors.comment}
              />
              <CategoryPicker name="category" selectedValue={props.values.category} onChange={props.setFieldValue} />
              <MultiPicker
                items={this.muscleGroups}
                name="muscles"
                label="Muskelgruppe(n)"
                onChange={props.setFieldValue}
                selectedItems={props.values.muscles}
              />
              <Button
                title="Submit"
                onPress={props.submitForm}
                disabled={!props.isValid || props.isSubmitting}
                loading={props.isSubmitting}
              />
            </View>
          )}
          enableReinitialize={true}
        />
      </ScrollView>
    );
  }

  public handleSubmit(values: IMyFormValues) {
    this.props.saveWorkout({ ...this.props.exercise, name: values.name });
  }
}

export default ExerciseAddScreen;
