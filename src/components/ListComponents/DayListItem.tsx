import withObservables from '@nozbe/with-observables';
import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Navigation, OptionsModalPresentationStyle } from 'react-native-navigation';
import Day from '../../watermelondb/models/Day';
import Set from '../../watermelondb/models/Set';
import SetItem from './SetItem';

interface IProps {
  day: Day;
  sets?: Set[];
  onEdit: (id: string) => void;
  onDelete: (day: Day) => void;
}

const DayListItem: FC<IProps> = ({ day, onEdit, onDelete, sets = [] }) => {
  const onDayEdit = () => {
    onEdit(day.id);
  };

  const onDayDelete = () => {
    onDelete(day);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ flex: 1, color: 'white' }}>
          {day.description} - {day.days.map(weekday => weekday).join(', ')}
        </Text>
        <Icon name="edit" iconStyle={{ color: 'white' }} onPress={onDayEdit} />
        <Icon name="delete" iconStyle={{ color: 'white' }} onPress={onDayDelete} />
      </View>
      <View style={styles.body}>
        {sets.length === 0 && (
          <View>
            <Text>Noch keine Übungen eingetragen</Text>
          </View>
        )}
        {sets.map(set => (
          <SetItem key={set.id} set={set} />
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

const enhance = withObservables<IProps>(['day'], ({ day }) => ({ day: day.observe(), sets: day.sets.observe() }));

const styles = StyleSheet.create({
  container: { margin: 16, marginTop: 0, borderWidth: 0, borderColor: 'grey', borderRadius: 3, elevation: 1 },
  header: {
    height: 36,
    backgroundColor: 'red',
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
