import React, { FC } from 'react';
import { SectionList, SectionListData, SectionListRenderItemInfo, View } from 'react-native';
import { Divider, Text } from 'react-native-elements';
import AddButton from '../../components/AddButton';
import { ListEmptyComponent } from '../../components/ListComponents';
import SectionListItem from '../../components/ListComponents/SectionListItem';
import styles from '../../styles';
import Exercise from '../../watermelondb/models/Exercise';

interface IExerciseByCategory {
  title: string;
  data: Exercise[];
}

interface IProps {
  exercises: Array<{ title: string; data: Exercise[] }>;
  onPress: (id?: string) => void;
}

const ExerciseScreen: FC<IProps> = props => {
  const onEdit = (id: string) => {
    props.onPress(id);
  };

  const onAdd = () => {
    props.onPress();
  };

  const renderItem = ({ item }: SectionListRenderItemInfo<Exercise>) => {
    return <SectionListItem exercise={item} onPress={onEdit} />;
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
      <AddButton onPress={onAdd} />
    </View>
  );
};

export default ExerciseScreen;
