import React, { PureComponent } from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import { Divider, ListItem } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import AddButton from '../components/AddButton';
import { ListEmptyComponent } from '../components/ListComponents';
import styles from '../styles';
import { IDeleteWorkout, IGetWorkouts, IWorkout, IWorkouts } from '../types/workoutTypes';

interface IProps {
  workouts: IWorkouts;
  getWorkouts: () => IGetWorkouts;
  deleteWorkout: (id: number) => IDeleteWorkout;
  componentId: string;
  isFetching: boolean;
}

export default class WorkoutScreen extends PureComponent<IProps> {
  public static options() {
    return {
      topBar: {
        title: { text: 'Trainingspläne' }
      }
    };
  }

  constructor(props: IProps) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  public componentDidAppear() {
    this.props.getWorkouts();
  }

  public onPress(id: number) {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'WorkoutScreen.Add',
        passProps: {
          id
        }
      }
    });
  }

  public render() {
    return (
      <View style={styles.layout.main}>
        <FlatList
          data={this.props.workouts.results}
          ItemSeparatorComponent={Divider}
          keyExtractor={this.keyExtractor}
          ListEmptyComponent={ListEmptyComponent}
          renderItem={this.renderItem.bind(this)}
        />
        <AddButton onPress={this.onPress.bind(this, 0)} />
      </View>
    );
  }

  private renderItem({ item }: ListRenderItemInfo<IWorkout>) {
    return (
      <ListItem
        key={item.id}
        title={item.comment}
        chevron={{ name: 'chevron-right', size: 26 }}
        onPress={this.onPress.bind(this, item.id)}
      />
    );
  }

  private keyExtractor(item: IWorkout) {
    return item.id.toString();
  }
}
