import React, { FC } from 'react';
import { TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from '../styles';

interface IProps {
  onPress: () => void;
}

const AddButton: FC<IProps> = ({ onPress }) => {
  return (
    <TouchableHighlight style={styles.layout.addButtonPosition} onPress={onPress} underlayColor={'transparent'}>
      <Icon containerStyle={styles.layout.addButton} name="add" size={18} color="#ffffff" />
    </TouchableHighlight>
  );
};

export default AddButton;
