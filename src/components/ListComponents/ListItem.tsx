import React, { SFC } from 'react';
import { ListItem } from 'react-native-elements';
import { IExercise } from '../../types/exerciseTypes';

interface IProps {
  item: IExercise;
  onPress: () => void;
}

export const Item: SFC<IProps> = props => {
  const { item, onPress } = props;
  return <ListItem key={item.id} title={item.name} chevron={{ name: 'chevron-right', size: 26 }} onPress={onPress} />;
};
