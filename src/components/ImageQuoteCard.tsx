import React from 'react';
import { Dimensions, ImageBackground, View } from 'react-native';
import { Text } from 'react-native-elements';

const ImageQuoteCard = () => (
  <ImageBackground
    source={require('../../res/images/athlet-ausbildung-ausrustungen-305239.jpg')}
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
      <Text style={{ color: '#EEEEEE', fontSize: 22, lineHeight: 36, fontStyle: 'italic' }}>
        "If you have dreams it is your responsibility to make them happen."
      </Text>
      <Text style={{ color: '#CCCCCC', alignSelf: 'flex-end', marginRight: 32 }}>- Bel Pesce</Text>
    </View>
  </ImageBackground>
);

export default ImageQuoteCard;
