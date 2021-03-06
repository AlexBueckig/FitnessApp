import withObservables from '@nozbe/with-observables';
import dayjs from 'dayjs';
import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Navigation, OptionsModalPresentationStyle } from 'react-native-navigation';
import { compose } from 'recompose';
import Day from '../../watermelondb/models/Day';
import Exercise from '../../watermelondb/models/Exercise';

interface IProps {
  day: Day;
  exercises?: Exercise[];
  onEdit: (id: string) => void;
  onDelete: (day: Day) => void;
}

const DayListItem: FC<IProps> = ({ day, onEdit, onDelete, exercises = [] }) => {
  const onDayEdit = () => {
    onEdit(day.id);
  };

  const onDayDelete = () => {
    onDelete(day);
  };

  console.log(day, exercises);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ flex: 1, color: 'white' }}>
          {day.description} -{' '}
          {day.days
            .map(weekday =>
              dayjs()
                .day(weekday)
                .format('dddd')
            )
            .join(', ')}
        </Text>
        <Icon color="white" name="edit" onPress={onDayEdit} />
        <Icon color="white" name="delete" onPress={onDayDelete} />
      </View>
      <View style={styles.body}>
        {exercises.length === 0 && (
          <View>
            <Text>Noch keine Übungen eingetragen</Text>
          </View>
        )}
        {exercises.map(exercise => (
          <View key={`DayListItem-${exercise.id}`} style={{ flexDirection: 'row' }}>
            <Text style={{ flex: 1, alignItems: 'center' }}>{exercise.name}</Text>
            <Icon name="close" onPress={() => day.removeExercise({ exerciseId: exercise.id })} />
          </View>
        ))}
        <View style={styles.addExercise}>
          <Text
            style={{ color: 'green' }}
            onPress={() => {
              Navigation.showModal({
                component: {
                  name: 'DayAddExerciseModal',
                  passProps: {
                    id: day.id
                  },
                  options: {
                    layout: {
                      backgroundColor: 'rgba(0,0,0,0.7)'
                    },
                    modalPresentationStyle: OptionsModalPresentationStyle.overCurrentContext
                  }
                }
              });
            }}
          >
            Übungen hinzufügen
          </Text>
        </View>
      </View>
    </View>
  );
};

const enhance = compose<IProps, IProps>(
  withObservables<IProps, {}>(['day'], ({ day }) => ({
    day: day.observe()
  })),
  withObservables<IProps, {}>(['day'], ({ day }) => ({
    exercises: day.exercises.observe()
  }))
);

const styles = StyleSheet.create({
  container: { marginBottom: 16, borderWidth: 0, borderColor: 'grey', borderRadius: 3, elevation: 1 },
  header: {
    height: 36,
    backgroundColor: '#14C788',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 8,
    borderTopRightRadius: 3,
    borderTopLeftRadius: 3
  },
  body: { padding: 8 },
  addExercise: { alignItems: 'flex-end' }
});

export default enhance(DayListItem);
