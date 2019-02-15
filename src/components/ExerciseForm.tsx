import { Formik, FormikActions, FormikProps } from 'formik';
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import * as yup from 'yup';
import { IExercise } from '../types/exerciseTypes';
import CategoryPicker from './FormComponents/CategoryPicker';
import TextInput from './FormComponents/Input';
import MultiPicker from './FormComponents/MultiPicker';

type IProps = IExercise & { submit: (exercise: IExercise) => void };

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .min(3)
    .max(255),
  category: yup.string().required()
});

const muscleGroups = [
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

const categories = ['Arme', 'Bauch', 'Beine', 'Brust', 'Rücken', 'Schultern', 'Waden'];

export default class ExerciseForm extends PureComponent<IProps> {
  public render() {
    return (
      <Formik
        initialValues={{
          id: this.props.id,
          name: this.props.name,
          category: this.props.category,
          description: this.props.description,
          muscles: this.props.muscles
        }}
        onSubmit={this.handleSubmit}
        enableReinitialize={true}
        validationSchema={validationSchema}
      >
        {({ values, errors, touched, isSubmitting, handleSubmit }: FormikProps<IExercise>) => {
          return (
            <View style={{ alignItems: 'center' }}>
              <TextInput
                label="Name"
                name="name"
                placeholder="Name der Übung"
                value={values.name}
                error={touched.name && errors.name ? errors.name : undefined}
              />
              <TextInput
                label="Beschreibung"
                name="description"
                placeholder="optional"
                value={values.description || ''}
                // error={touched.comment && errors.comment}
              />
              <CategoryPicker
                title="Kategorie"
                name="category"
                categories={categories}
                selectedValue={values.category || ''}
                error={touched.category && errors.category ? errors.category : undefined}
              />
              <MultiPicker
                items={muscleGroups}
                name="muscles"
                label="Muskelgruppe(n)"
                selectedItems={Object.assign(values.muscles || [])}
              />
              <Button
                title="Submit"
                containerStyle={{ height: 40 }}
                buttonStyle={{ backgroundColor: 'rgba(78, 116, 289, 1)' }}
                titleStyle={{ color: 'white', marginHorizontal: 20 }}
                disabled={isSubmitting}
                onPress={handleSubmit}
              />
            </View>
          );
        }}
      </Formik>
    );
  }

  private handleSubmit = (values: IExercise, { setSubmitting }: FormikActions<IExercise>) => {
    setSubmitting(false);
    this.props.submit(values);
  };
}
