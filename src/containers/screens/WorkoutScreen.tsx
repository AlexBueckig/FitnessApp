import React, { FC } from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import { Divider } from 'react-native-elements';
import AddButton from '../../components/AddButton';
import { ListEmptyComponent } from '../../components/ListComponents';
import ListItem from '../../components/ListComponents/ListItem';
import styles from '../../styles';
import Workout from '../../watermelondb/models/Workout';

interface IProps {
  workouts: Workout[];
  onEdit: (id: string) => void;
  onAdd: () => void;
}

const WorkoutScreen: FC<IProps> = ({ onEdit, onAdd, workouts }) => {
  const renderItem = ({ item }: ListRenderItemInfo<Workout>) => {
    return <ListItem workout={item} onPress={onEdit} />;
  };

  const keyExtractor = (item: Workout) => {
    return item.id.toString();
  };

  return (
    <View style={styles.layout.main}>
      <FlatList
        data={workouts}
        ItemSeparatorComponent={() => <Divider />}
        keyExtractor={keyExtractor}
        ListEmptyComponent={ListEmptyComponent}
        renderItem={renderItem}
      />
      <AddButton onPress={onAdd} />
    </View>
  );
};

export default WorkoutScreen;
