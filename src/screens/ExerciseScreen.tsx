import React, { FC } from 'react';
import { SectionList, SectionListData, SectionListRenderItemInfo, View } from 'react-native';
import { Divider, Text } from 'react-native-elements';
import AddButton from '../components/AddButton';
import { ListEmptyComponent } from '../components/ListComponents';
import SectionListItem from '../components/ListComponents/SectionListItem';
import styles from '../styles';
import { IExerciseByCategory } from '../types/exerciseTypes';
import Exercise from '../watermelondb/models/Exercise';

interface IProps {
  exercises: Array<{ title: string; data: Exercise[] }>;
  onPress: (id: string | undefined) => void;
}

const ExerciseScreen: FC<IProps> = props => {
  const onPress = (id: string | undefined = undefined) => {
    props.onPress(id);
  };

  const renderItem = ({ item }: SectionListRenderItemInfo<Exercise>) => {
    return <SectionListItem exercise={item} onPress={onPress} />;
  };

  const renderSectionHeader = (info: { section: SectionListData<IExerciseByCategory> }) => {
    const {
      section: { title }
    } = info;
    return (
      <Text style={{ fontSize: 16, backgroundColor: '#14C788', color: 'white', textAlign: 'center' }}>{title}</Text>
    );
  };

  const keyExtractor = (item: Exercise) => {
    return `${item.id}`;
  };

  return (
    <View style={styles.layout.main}>
      <SectionList
        sections={props.exercises}
        renderItem={renderItem}
        ItemSeparatorComponent={Divider}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={keyExtractor}
        ListEmptyComponent={ListEmptyComponent}
        SectionSeparatorComponent={Divider}
      />
      <AddButton onPress={onPress} />
    </View>
  );
};

export default ExerciseScreen;
