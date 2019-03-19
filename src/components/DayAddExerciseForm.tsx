import { FieldArray, Formik, FormikActions, FormikProps } from 'formik';
import React, { Fragment, PureComponent } from 'react';
import { Picker, View } from 'react-native';
import { Button } from 'react-native-elements';
import Exercise from '../watermelondb/models/Exercise';
import { ISaveSetParams } from '../watermelondb/models/Set';
import TextInput from './FormComponents/Input';

interface IProps {
  submit: (values: ISaveSetParams) => void;
  exercises: Exercise[];
}

interface IState {
  selectedCategory: number;
  selectedExercise: number;
  exercises: Array<{ title: string; data: Exercise[] }>;
}

export default class DayAddExerciseForm extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { selectedCategory: 0, selectedExercise: 0, exercises: this.processExercises(this.props.exercises) };
  }

  render() {
    return (
      <Formik initialValues={{ sets: 0, exercises: [] }} onSubmit={this.handleSubmit}>
        {({ handleSubmit, values }: FormikProps<ISaveSetParams>) => (
          <View>
            <TextInput value={`${values.sets}`} name="sets" label="Sets" />
            <FieldArray name="exercises">
              {arrayHelpers => (
                <Fragment>
                  <Picker
                    selectedValue={this.state.selectedCategory}
                    onValueChange={value => this.setState({ selectedCategory: value, selectedExercise: 0 })}
                  >
                    {this.state.exercises.map((category, index) => (
                      <Picker.Item key={`${index}${category.title}`} value={index} label={category.title} />
                    ))}
                  </Picker>
                  <Picker
                    selectedValue={this.state.selectedExercise}
                    onValueChange={value => this.setState({ selectedExercise: value })}
                  >
                    {this.state.exercises[this.state.selectedCategory].data.map((exercise, index) => (
                      <Picker.Item key={exercise.id} value={index} label={exercise.name} />
                    ))}
                  </Picker>
                  <Button
                    title="Übung hinzufügen"
                    onPress={() =>
                      arrayHelpers.push(
                        this.state.exercises[this.state.selectedCategory].data[this.state.selectedExercise].id
                      )
                    }
                    containerStyle={{ height: 40 }}
                    buttonStyle={{ backgroundColor: 'rgba(78, 116, 289, 1)' }}
                    titleStyle={{ color: 'white', marginHorizontal: 20 }}
                  />
                </Fragment>
              )}
            </FieldArray>
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    );
  }

  private processExercises = (exercises: Exercise[]) => {
    const processedExercises: { [key: string]: Exercise[] } = {};
    exercises.map(exercise => {
      if (!processedExercises[exercise.category]) {
        processedExercises[exercise.category] = [];
      }
      processedExercises[exercise.category].push(exercise);
    });
    return Object.entries(processedExercises).map(([key, value]) => ({ title: key, data: value }));
  };

  private handleSubmit = (values: ISaveSetParams, { setSubmitting }: FormikActions<ISaveSetParams>) => {
    setSubmitting(false);
    // Turn sets back into number
    values.sets = +values.sets;
    this.props.submit(values);
  };
}
