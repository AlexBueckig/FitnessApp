import { FieldArray, Formik, FormikProps } from 'formik';
import React, { Fragment, PureComponent } from 'react';
import { Picker, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { IDay } from '../types/dayTypes';
import { IExercises } from '../types/exerciseTypes';
import TextInput from './Input';

interface IProps {
  day: IDay;
  exercises: IExercises;
  handleSubmit: (values: IDay) => void;
}

interface IState {
  selectedCategory: number;
  selectedExercise: number;
}

class DayAddForm extends PureComponent<IProps, IState> {
  public state = { selectedCategory: 0, selectedExercise: 0 };

  public render() {
    const { props, state } = this;
    return (
      <Formik
        initialValues={{
          id: props.day.id,
          description: props.day.description,
          day: props.day.day,
          sets: props.day.sets
        }}
        onSubmit={props.handleSubmit}
        enableReinitialize={true}
      >
        {({
          values,
          setFieldValue,
          setFieldTouched,
          submitForm,
          isValid,
          isSubmitting,
          errors,
          touched
        }: FormikProps<IDay>) => (
          <View style={{ alignItems: 'center' }}>
            <TextInput
              label="description"
              name="description"
              value={values.description}
              onChange={setFieldValue}
              onTouch={setFieldTouched}
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
                            <Picker.Item key={JSON.stringify(exercise)} value={index} label={exercise.name} />
                          ))}
                      </Picker>
                    </Fragment>
                  )}
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
                  {values.sets.length > 0 &&
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
                    })}
                </View>
              )}
            />
            <Button
              title="Submit"
              onPress={submitForm}
              disabled={!isValid || isSubmitting}
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
