import React, { Component } from 'react';
import { Animated } from 'react-native';
import { Text } from 'react-native-elements';

import { Icon } from 'react-native-elements';
import styles from '../styles';

interface IProps {
  onDismiss: (id: number) => void;
  id: number;
  message: string;
}

class Toast extends Component<IProps> {
  public state = {
    fadeInOut: new Animated.Value(0)
  };
  private timeout?: number;

  public componentDidMount = () => {
    Animated.timing(this.state.fadeInOut, { toValue: 1, duration: 250, useNativeDriver: true }).start();
    this.timeout = setTimeout(() => {
      Animated.timing(this.state.fadeInOut, { toValue: 0, duration: 250, useNativeDriver: true }).start(() => {
        this.props.onDismiss(this.props.id);
      });
    }, 5000);
  };

  public render() {
    const { toasts } = styles.layout;

    return (
      <Animated.View style={[toasts.toast, { opacity: this.state.fadeInOut }]}>
        <Text style={toasts.toast__message}>{this.props.message}</Text>
        <Icon iconStyle={toasts.toast__button} name="close" onPress={this.onClick} />
      </Animated.View>
    );
  }

  public shouldComponentUpdate = () => {
    return false;
  };

  private onClick = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.props.onDismiss(this.props.id);
  };
}

export default Toast;
