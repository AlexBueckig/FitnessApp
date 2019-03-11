import React, { FC } from 'react';
import { Button, Text, View } from 'react-native';
import Day from '../../watermelondb/models/Day';

interface IProps {
  day: Day;
}

const DayListItem: FC<IProps> = props => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Text>{props.day.description}</Text>
      <Button title="Delete" onPress={() => props.day.deleteEntry()} />
    </View>
  );
};

// const enhance = withObservables(['day'], ({ day }: IProps) => ({ day: day.observe() }));

// export default enhance(DayListItem);

export default DayListItem;
