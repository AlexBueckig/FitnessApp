import React, { FC } from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import { Divider } from 'react-native-elements';
import AddButton from '../components/AddButton';
import { ListEmptyComponent } from '../components/ListComponents';
import ListItem from '../components/ListComponents/ListItem';
import styles from '../styles';
import Workout from '../watermelondb/models/Workout';

interface IProps {
  workouts: Workout[];
  onPress: (id: string | undefined) => void;
  onFabPress: () => void;
}

const WorkoutScreen: FC<IProps> = props => {
  const renderItem = ({ item }: ListRenderItemInfo<Workout>) => {
    return <ListItem workout={item} onPress={onPress} />;
  };

  const onPress = (id: string | undefined = undefined) => {
    props.onPress(id);
  };

  const keyExtractor = (item: Workout) => {
    return item.id.toString();
  };

  return (
    <View style={styles.layout.main}>
      <FlatList
        data={props.workouts}
        ItemSeparatorComponent={Divider}
        keyExtractor={keyExtractor}
        ListEmptyComponent={ListEmptyComponent}
        renderItem={renderItem}
      />
      {/* <AddButton onPress={onPress} /> */}
      <AddButton onPress={props.onFabPress} />
    </View>
  );
};

export default WorkoutScreen;
