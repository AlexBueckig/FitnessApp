import { FormikProps } from 'formik';
import React from 'react';
import { Button, View } from 'react-native';

import CategoryPicker from './CategoryPicker';
import TextInput from './Input';
import MultiPicker from './MultiPicker';

interface IMyFormValues {
  name: string;
  category: string;
  description: string;
  muscles: number[];
}

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

const ExerciseForm = (props: FormikProps<IMyFormValues>) => (
  <View>
    <TextInput
      label="Name"
      name="name"
      placeholder="Name der Übung"
      value={props.values.name}
      onChange={props.setFieldValue}
      onTouch={props.setFieldTouched}
      error={props.touched.name && props.errors.name ? props.errors.name : undefined}
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
    <CategoryPicker
      title="Kategorie"
      name="category"
      categories={categories}
      selectedValue={props.values.category}
      onChange={props.setFieldValue}
    />
    <MultiPicker
      items={muscleGroups}
      name="muscles"
      label="Muskelgruppe(n)"
      onChange={props.setFieldValue}
      selectedItems={Object.assign(props.values.muscles)}
    />
    <Button title="Submit" onPress={props.submitForm} disabled={!props.isValid || props.isSubmitting} />
  </View>
);

export default ExerciseForm;
