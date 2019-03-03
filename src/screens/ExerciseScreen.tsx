import React, { Component } from 'react';
import { SectionList, SectionListData, SectionListRenderItemInfo, View } from 'react-native';
import { Divider, Text } from 'react-native-elements';
import AddButton from '../components/AddButton';
import { ListEmptyComponent } from '../components/ListComponents';
import SectionListItem from '../components/ListComponents/SectionListItem';
import styles from '../styles';
import { IExercise, IExerciseByCategory } from '../types/exerciseTypes';
import Exercise from '../watermelondb/models/Exercise';

interface IProps {
  exercises: Array<{ title: string; data: Exercise[] }>;
  isFetching: boolean;
  onPress: (id: string | undefined) => void;
}

export default class ExerciseScreen extends Component<IProps> {
  public render() {
    return (
      <View style={styles.layout.main}>
        <SectionList
          sections={this.props.exercises}
          renderItem={this.renderItem}
          ItemSeparatorComponent={Divider}
          renderSectionHeader={this.renderSectionHeader}
          keyExtractor={this.keyExtractor}
          ListEmptyComponent={ListEmptyComponent}
          SectionSeparatorComponent={Divider}
        />
        <AddButton onPress={this.onPress} />
      </View>
    );
  }

  private onPress = (id: string | undefined = undefined) => {
    this.props.onPress(id);
  };

  private renderItem = ({ item }: SectionListRenderItemInfo<Exercise>) => {
    return <SectionListItem exercise={item} onPress={this.onPress} />;
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
    return `${item.id}`;
  }
}
