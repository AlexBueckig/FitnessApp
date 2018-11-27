import React, { PureComponent } from 'react';
import { TouchableHighlight, View, ViewStyle } from 'react-native';
import { Icon, Text } from 'react-native-elements';

import styles from '../styles';

interface IProps {
  style?: ViewStyle;
  onPress: () => void;
  title: string;
  borderRadius?: number;
}

export default class Card extends PureComponent<IProps> {
  public render() {
    const borderRadius = this.props.borderRadius || 0;
    return (
      <TouchableHighlight
        underlayColor={'transparent'}
        style={[{ borderRadius, marginTop: 16 }, this.props.style || {}]}
        onPress={this.props.onPress}
      >
        <View style={{ justifyContent: 'center', alignItems: 'center', minHeight: 167, borderRadius }}>
          {/* Dark Image Overlay */}
          <View
            style={{
              position: 'absolute',
              backgroundColor: 'black',
              opacity: 0.5,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius
            }}
          />
          {/* Card-Header */}
          <View
            style={{
              height: 52,
              backgroundColor: '#14C788',
              borderTopLeftRadius: borderRadius,
              borderTopRightRadius: borderRadius,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              position: 'absolute',
              top: 0,
              zIndex: 1
            }}
          >
            <Text style={[styles.typography.cardTitle, {}]}>{this.props.title}</Text>
          </View>
          <View style={{ maxWidth: '70%' }}>{this.props.children}</View>
          <Icon
            color="#FFFFFF"
            size={72}
            containerStyle={{ position: 'absolute', right: 0 }}
            name="keyboard-arrow-right"
          />
        </View>
      </TouchableHighlight>
    );
  }
}
