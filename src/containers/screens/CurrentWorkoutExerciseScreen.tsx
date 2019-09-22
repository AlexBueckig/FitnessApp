import React, { FC } from 'react';
import { FlatList, ListRenderItemInfo, Text, View } from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import CurrentWorkoutAddSetForm from '../../components/CurrentWorkoutAddSetForm';
import Exercise from '../../watermelondb/models/Exercise';
import Workoutlog from '../../watermelondb/models/Workoutlog';

interface IProps {
  exercise: Exercise;
  sets: Workoutlog[];
  date: string;
}

const CurrentWorkoutExerciseScreen: FC<IProps> = ({ exercise, sets, date }) => {
  const renderHeader = () => <Text style={{ marginBottom: 16, fontSize: 16 }}>Absolvierte Sätze</Text>;
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ marginBottom: 16, fontSize: 16 }}>Aktueller Satz</Text>
      <CurrentWorkoutAddSetForm date={date} exercise={exercise} />
      <Divider style={{ marginVertical: 16 }} />
      <FlatList
        data={sets}
        ListHeaderComponent={renderHeader}
        renderItem={({ item, index }: ListRenderItemInfo<Workoutlog>) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 32 }}>
            <Text>{index + 1}.</Text>
            <Text>{item.weight} kgs</Text>
            <Text>{item.reps} reps</Text>
            <Icon name="delete" onPress={() => item.deleteEntry()} />
          </View>
        )}
      />
    </View>
  );
};

export default CurrentWorkoutExerciseScreen;
