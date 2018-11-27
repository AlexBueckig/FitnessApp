import React, { PureComponent } from 'react';
import { ImageBackground, ImageSourcePropType, ViewStyle } from 'react-native';

import Card from './Card';

import styles from '../styles';

interface IProps {
  style?: ViewStyle;
  title: string;
  image: ImageSourcePropType;
  onPress: () => void;
  borderRadius?: number;
}

export default class CardImageBackground extends PureComponent<IProps> {
  public render() {
    const borderRadius = this.props.borderRadius || 0;
    return (
      <ImageBackground
        source={this.props.image}
        style={[styles.layout.container, { minWidth: 167 }]}
        imageStyle={{ borderRadius, marginTop: 16 }}
      >
        <Card
          title={this.props.title}
          style={this.props.style || {}}
          onPress={this.props.onPress}
          borderRadius={this.props.borderRadius}
        >
          {this.props.children}
        </Card>
      </ImageBackground>
    );
  }
}
