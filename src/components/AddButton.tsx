import React, { PureComponent } from 'react';
import { TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from '../styles';

interface IProps {
  onPress: () => void;
}

class AddButton extends PureComponent<IProps> {
  public render() {
    return (
      <TouchableHighlight style={styles.layout.addButtonPosition} onPress={this.onPress} underlayColor={'transparent'}>
        <Icon containerStyle={styles.layout.addButton} name="add" size={18} color="#ffffff" />
      </TouchableHighlight>
    );
  }

  onPress = () => {
    this.props.onPress();
  };
}

export default AddButton;
