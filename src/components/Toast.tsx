import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';

interface IProps {
  onDismiss: (id: number) => void;
  id: number;
  message: string;
}

class Toast extends Component<IProps> {
  public render() {
    return (
      <View>
        <Text>{this.props.message}</Text>
        <Button title="X" onPress={this.onClick} />
      </View>
    );
  }

  public shouldComponentUpdate = () => {
    return false;
  };

  private onClick = () => {
    this.props.onDismiss(this.props.id);
  };
}

export default Toast;
