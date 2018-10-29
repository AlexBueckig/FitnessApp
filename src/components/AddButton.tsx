import React, { Component } from 'react';
import { TouchableHighlight, View } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from '../styles';

interface IProps {
  onPress: () => void;
}

class AddButton extends Component<IProps> {
  public render() {
    return (
      <TouchableHighlight style={styles.layout.addButtonPosition} onPress={this.props.onPress} underlayColor="#f1f1f1">
        <View style={styles.layout.addButton}>
          <Icon name="add" size={24} color="#ffffff" />
        </View>
      </TouchableHighlight>
    );
  }
}

export default AddButton;
