import React, { FC } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { Divider, ListItem } from 'react-native-elements';
import AddButton from '../../components/AddButton';
import Container from '../../components/Container';
import { ListEmptyComponent } from '../../components/ListComponents';
import Day from '../../watermelondb/models/Day';

interface IProps {
  days: Day[];
}

const DayScreen: FC<IProps> = ({ days }) => {
  const onPress = () => {
    console.log('Test');
  };

  const renderItem = ({ item }: ListRenderItemInfo<Day>) => {
    return (
      <ListItem
        key={item.id}
        title={item.description}
        chevron={{ name: 'chevron-right', size: 26 }}
        onPress={onPress}
      />
    );
  };

  const keyExtractor = (item: Day) => {
    return item.id.toString();
  };

  return (
    <Container>
      <FlatList
        data={days}
        ItemSeparatorComponent={Divider}
        keyExtractor={keyExtractor}
        ListEmptyComponent={ListEmptyComponent}
        renderItem={renderItem}
      />
      <AddButton onPress={onPress} />
    </Container>
  );
};

export default DayScreen;
