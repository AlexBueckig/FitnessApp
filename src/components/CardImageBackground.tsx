import React, { FC } from 'react';
import { ImageBackground, ImageSourcePropType, View, ViewStyle } from 'react-native';
import Card from './Card';

interface IProps {
  style?: ViewStyle;
  title: string;
  image: ImageSourcePropType;
  onPress: () => void;
  borderRadius?: number;
}

const CardImageBackground: FC<IProps> = ({ children, image, title, onPress, borderRadius = 0, style = {} }) => {
  return (
    <ImageBackground
      source={image}
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
      <Card title={title} style={style || {}} onPress={onPress} borderRadius={borderRadius}>
        {children}
      </Card>
    </ImageBackground>
  );
};

export default CardImageBackground;
