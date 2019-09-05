import { Formik, FormikActions } from 'formik';
import React, { FC } from 'react';
import { Button, Picker, StyleSheet, View } from 'react-native';
import useCurrentWorkout from '../hooks/useCurrentWorkout';
import Set from '../watermelondb/models/Set';
import TextInput from './FormComponents/Input';

interface IProps {
  set: Set;
}

const SetListItemForm: FC<IProps> = ({ set }) => {
  const [currentWorkout, setCurrentWorkout] = useCurrentWorkout();
  const onSubmit = (values: {}, { setSubmitting }: FormikActions<{}>) => null;

  const reps = Array.from(Array(set.sets), () => '0');
  const weight = Array.from(Array(set.sets), () => '0');

  return (
    <Formik initialValues={{ reps, 'reps-unit': '', weight, 'weight-unit': '' }} onSubmit={onSubmit}>
      {({ values, handleSubmit }) => (
        <View style={styles.container}>
          {Array.from(Array(set.sets)).map((e, i) => (
            <View style={styles.row} key={`SetListItemForm${i}`}>
              <TextInput style={styles.itemInput} name={`reps.${i}`} value={values.reps[i]} label="Reps" />
              <Picker style={[styles.itemPicker, styles.itemPickerReps]}>
                <Picker.Item label="Anzahl" value="Anzahl" />
                <Picker.Item label="Until Failure" value="Until Failure" />
              </Picker>
              <TextInput style={styles.itemInput} name={`weight.${i}`} value={values.weight[i]} label="Gewicht" />
              <Picker style={[styles.itemPicker, styles.itemPickerWeight]}>
                <Picker.Item label="kg" value="kg" />
                <Picker.Item label="Körpergewicht" value="Körpergewicht" />
              </Picker>
            </View>
          ))}

          <Button title="Speichern" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly'
  },
  itemInput: {
    flex: 1,
    maxWidth: '20%'
  },
  itemPicker: { flex: 1, marginTop: 10 },
  itemPickerReps: {},
  itemPickerWeight: {
    maxWidth: '25%'
  }
});

export default SetListItemForm;
