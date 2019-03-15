import React, { PureComponent } from 'react';
import { ImageBackground, ImageSourcePropType, View, ViewStyle } from 'react-native';
import Card from './Card';

interface IProps {
  style?: ViewStyle;
  title: string;
  image: ImageSourcePropType;
  onPress: () => void;
  borderRadius?: number;
}

export default class CardImageBackground extends PureComponent<IProps> {
  public render() {
    const { borderRadius } = this.props;
    return (
      <ImageBackground
        source={this.props.image}
        style={{ minWidth: 167, elevation: 1, position: 'relative' }}
        imageStyle={{ borderRadius, marginTop: 16 }}
      >
        {/* Dark Image Overlay */}
        <View
          style={{
            position: 'absolute',
            backgroundColor: 'black',
            opacity: 0.5,
            top: 16,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius
          }}
        />
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
