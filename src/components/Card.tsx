import React, { FC } from 'react';
import { TouchableHighlight, View, ViewStyle } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import styles from '../styles';

interface IProps {
  style?: ViewStyle;
  onPress: () => void;
  title: string;
  borderRadius?: number;
}

const Card: FC<IProps> = ({ children, title, onPress, borderRadius = 0, style = {} }) => {
  return (
    <TouchableHighlight
      underlayColor={'transparent'}
      style={[{ borderRadius, marginTop: 16 }, style]}
      onPress={onPress}
    >
      <View style={{ justifyContent: 'center', alignItems: 'center', minHeight: 167, borderRadius }}>
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
          <Text style={[styles.typography.cardTitle, {}]}>{title}</Text>
        </View>
        <View style={{ maxWidth: '70%' }}>{children}</View>
        <Icon
          color="#FFFFFF"
          size={72}
          containerStyle={{ position: 'absolute', right: 0 }}
          name="keyboard-arrow-right"
        />
      </View>
    </TouchableHighlight>
  );
};

export default Card;
