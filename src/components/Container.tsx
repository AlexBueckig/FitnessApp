import React, { FC } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface IProps {
  style?: StyleProp<ViewStyle>;
}

const Container: FC<IProps> = ({ children, style = {} }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export default Container;

const styles = StyleSheet.create({ container: { padding: 16 } });
