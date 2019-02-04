import React, { PureComponent } from 'react';
import { SectionList, SectionListData, SectionListRenderItemInfo, View } from 'react-native';
import { Divider, ListItem, Text } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import AddButton from '../components/AddButton';
import { ListEmptyComponent } from '../components/ListComponents';
import styles from '../styles';
import { IDeleteExercise, IExercise, IExerciseByCategory, IExercises, IGetExercises } from '../types/exerciseTypes';

interface IProps {
  exercises: IExercises;
  getExercises: () => IGetExercises;
  deleteExercise: (id: number) => IDeleteExercise;
  componentId: string;
  isFetching: boolean;
}

export default class ExerciseScreen extends PureComponent<IProps> {
  public static options() {
    return {
      topBar: {
        title: { text: 'Meine Übungen' }
      }
    };
  }

  constructor(props: IProps) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  public componentDidAppear() {
    this.props.getExercises();
  }

  public onPress(id: number) {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'ExerciseScreen.Add',
        passProps: {
          id
        }
      }
    });
  }

  public render() {
    return (
      <View style={styles.layout.main}>
        <SectionList
          sections={this.props.exercises.results}
          renderItem={this.renderItem}
          ItemSeparatorComponent={Divider}
          renderSectionHeader={this.renderSectionHeader}
          keyExtractor={this.keyExtractor}
          ListEmptyComponent={ListEmptyComponent}
          SectionSeparatorComponent={Divider}
        />
        <AddButton onPress={this.onPress.bind(this, 0)} />
      </View>
    );
  }

  private renderItem = ({ item }: SectionListRenderItemInfo<IExercise>) => {
    return (
      <ListItem
        key={item.id}
        title={item.name}
        chevron={{ name: 'chevron-right', size: 26 }}
        onPress={this.onPress.bind(this, item.id)}
      />
    );
  };

  private renderSectionHeader(info: { section: SectionListData<IExerciseByCategory> }) {
    const {
      section: { title }
    } = info;
    return (
      <Text style={{ fontSize: 16, backgroundColor: '#14C788', color: 'white', textAlign: 'center' }}>{title}</Text>
    );
  }

  private keyExtractor(item: IExercise) {
    return item.id.toString();
  }
}
