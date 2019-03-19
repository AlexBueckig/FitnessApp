import React, { PureComponent } from 'react';
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

export default class WorkoutScreen extends PureComponent<IProps> {
  public render() {
    return (
      <View style={styles.layout.main}>
        <FlatList
          data={this.props.workouts}
          ItemSeparatorComponent={Divider}
          keyExtractor={this.keyExtractor}
          ListEmptyComponent={ListEmptyComponent}
          renderItem={this.renderItem}
        />
        {/* <AddButton onPress={this.onPress} /> */}
        <AddButton onPress={this.onFabPress} />
      </View>
    );
  }

  private renderItem = ({ item }: ListRenderItemInfo<Workout>) => {
    return <ListItem workout={item} onPress={this.onPress} />;
  };

  private onPress = (id: string | undefined = undefined) => {
    this.props.onPress(id);
  };

  private onFabPress = () => {
    this.props.onFabPress();
  };

  private keyExtractor(item: Workout) {
    return item.id.toString();
  }
}
