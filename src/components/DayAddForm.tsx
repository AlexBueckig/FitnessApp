import { FieldArray, Formik, FormikProps } from 'formik';
import React, { Fragment, PureComponent } from 'react';
import { Picker, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import * as yup from 'yup';
import { IDay } from '../types/dayTypes';
import { IExercises } from '../types/exerciseTypes';
import TextInput from './FormComponents/Input';
import MultiPicker from './FormComponents/MultiPicker';

interface IProps {
  day: IDay;
  exercises: IExercises;
  handleSubmit: (values: IDay) => void;
}

interface IState {
  selectedCategory: number;
  selectedExercise: number;
}

const items = [
  { id: 0, name: 'Montag' },
  { id: 1, name: 'Dienstag' },
  { id: 2, name: 'Mittwoch' },
  { id: 3, name: 'Donnerstag' },
  { id: 4, name: 'Freitag' },
  { id: 5, name: 'Samstag' },
  { id: 6, name: 'Sonntag' }
];

const validationSchema = yup.object().shape({
  description: yup.string().required()
});

class DayAddForm extends PureComponent<IProps, IState> {
  public state = { selectedCategory: 0, selectedExercise: 0 };

  public render() {
    const { props, state } = this;
    return (
      <Formik
        initialValues={{
          id: props.day.id,
          description: props.day.description || '',
          days: props.day.days || [],
          sets: props.day.sets || []
        }}
        onSubmit={props.handleSubmit}
        enableReinitialize={true}
        validationSchema={validationSchema}
      >
        {({ values, submitForm, isSubmitting, errors, touched }: FormikProps<IDay>) => (
          <View style={{ alignItems: 'center' }}>
            <TextInput
              label="description"
              name="description"
              value={values.description}
              error={touched.description && errors.description ? errors.description : undefined}
            />
            <FieldArray
              name="sets"
              render={arrayHelpers => (
                <View>
                  {props.exercises.count > 0 && (
                    <Fragment>
                      <Picker
                        selectedValue={state.selectedCategory}
                        onValueChange={value => this.setState({ selectedCategory: value, selectedExercise: 0 })}
                      >
                        {props.exercises.results.map((category, index) => (
                          <Picker.Item key={JSON.stringify(category)} value={index} label={category.title} />
                        ))}
                      </Picker>
                      <Picker
                        selectedValue={state.selectedExercise}
                        onValueChange={value => this.setState({ selectedExercise: value })}
                      >
                        {props.exercises.count > 0 &&
                          props.exercises.results[state.selectedCategory].data.map((exercise, index) => (
                            <Picker.Item
                              key={`${index}${JSON.stringify(exercise)}`}
                              value={index}
                              label={exercise.name}
                            />
                          ))}
                      </Picker>
                      <Button
                        title="Übung hinzufügen"
                        onPress={() =>
                          arrayHelpers.push({
                            id: 0,
                            sets: 1,
                            exercise: props.exercises.results[state.selectedCategory].data[state.selectedExercise]
                          })
                        }
                        containerStyle={{ height: 40 }}
                        buttonStyle={{ backgroundColor: 'rgba(78, 116, 289, 1)' }}
                        titleStyle={{ color: 'white', marginHorizontal: 20 }}
                      />
                    </Fragment>
                  )}
                  {props.exercises && props.exercises.count === 0 && (
                    <Text>Keine Übungen vorhanden, lege welche an!</Text>
                  )}
                </View>
              )}
            />
            {/*             {values.sets.length > 0 &&
              values.sets.map((set, index) => {
                if (set.exercise) {
                  return (
                    <View
                      key={`${index}-${JSON.stringify(set)}`}
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <Text style={{ flex: 1 }}>{set.exercise.name}</Text>
                      <Button style={{ height: 32 }} title="Delete" onPress={() => arrayHelpers.remove(index)} />
                    </View>
                  );
                } else {
                  return null;
                }
              })} */}
            <MultiPicker label="Tage" name="days" items={items} selectedItems={values.days} />
            <Button
              title="Submit"
              onPress={submitForm}
              disabled={isSubmitting}
              containerStyle={{ height: 40 }}
              buttonStyle={{ backgroundColor: 'rgba(78, 116, 289, 1)' }}
              titleStyle={{ color: 'white', marginHorizontal: 20 }}
              loading={isSubmitting}
            />
          </View>
        )}
      </Formik>
    );
  }
}

export default DayAddForm;
