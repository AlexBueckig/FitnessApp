import React, { Component } from 'react';
import { TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from '../styles';

interface IProps {
  onPress: () => void;
}

class AddButton extends Component<IProps> {
  public render() {
    return (
      <TouchableHighlight
        style={styles.layout.addButtonPosition}
        onPress={this.props.onPress}
        underlayColor={'transparent'}
      >
        <Icon containerStyle={styles.layout.addButton} name="add" size={18} color="#ffffff" />
      </TouchableHighlight>
    );
  }
}

export default AddButton;
