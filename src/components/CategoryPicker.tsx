import React, { PureComponent } from 'react';
import { Picker, StyleSheet, Text, View } from 'react-native';
import styles from '../styles';

interface IProps {
  name: string;
  title: string;
  selectedValue: string;
  onChange: (name: string, text: string) => void;
  categories: string[];
}

class CategoryPicker extends PureComponent<IProps> {
  public render() {
    const { selectedValue, title } = this.props;
    return (
      <View style={styles1.root}>
        <Text style={styles.typography.label}>{title}</Text>
        <Picker selectedValue={selectedValue} onValueChange={this.handleChange}>
          <Picker.Item label="---" value="" />
          {this.props.categories.map((category, index) => (
            <Picker.Item key={index} value={category} label={category} />
          ))}
        </Picker>
      </View>
    );
  }

  private handleChange = (value: string) => {
    this.props.onChange(this.props.name, value);
  };
}

const styles1 = StyleSheet.create({
  root: {
    width: '90%',
    alignSelf: 'center'
  }
});

export default CategoryPicker;
