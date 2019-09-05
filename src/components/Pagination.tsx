import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

interface IProps {
  index: number;
  dots: number;
}

const Pagination: FC<IProps> = ({ index, dots }) => {
  return (
    <View style={styles.verticalBar}>
      {[...Array(dots)].map((e, i) => (
        <View key={`Pagination${i}`} style={[styles.dot, index === i ? styles.active : {}]} />
      ))}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  verticalBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: 'grey',
    opacity: 0.7,
    marginHorizontal: 4
  },
  active: {
    width: 16,
    height: 16,
    borderColor: '#14C788',
    borderWidth: 1,
    backgroundColor: 'black'
  }
});
