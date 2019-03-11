import React, { FC } from 'react';
import { View } from 'react-native';
import Day from '../../watermelondb/models/Day';
import DayListItem from './DayListItem';

interface IProps {
  days: Day[];
}

const DayList: FC<IProps> = props => {
  console.log(props.days);
  return (
    <View>
      {props.days.map(day => (
        <DayListItem key={day.id} day={day} />
      ))}
    </View>
  );
};

export default DayList;
