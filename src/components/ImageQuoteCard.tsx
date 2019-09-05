import React, { FC } from 'react';
import { Dimensions, ImageBackground, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useQuote } from '../hooks';

interface IProps {}

const ImageQuoteCard: FC<IProps> = props => {
  const { text, author } = useQuote();

  return (
    <ImageBackground
      source={require('../../res/images/athlet-ausbildung-ausrustungen-305239.jpg')}
      // source={{ uri: backgroundUrl }}
      style={{ height: 200, width: Dimensions.get('window').width }}
      resizeMode={'cover'}
    >
      <View
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: 32
        }}
      >
        <Text style={styles.quote}>{`"${text}"`}</Text>
        <Text style={styles.author}>{`- ${author}`}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  author: { color: '#CCCCCC', alignSelf: 'flex-end', marginRight: 32 },
  quote: { color: '#EEEEEE', fontSize: 22, lineHeight: 36, fontStyle: 'italic' }
});

export default ImageQuoteCard;
