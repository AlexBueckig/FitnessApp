import React, { PureComponent } from 'react';
import { Picker, StyleSheet, View } from 'react-native';

interface IProps {
  name: string;
  selectedValue: string;
  onChange: (name: string, text: string) => void;
}

class CategoryPicker extends PureComponent<IProps> {
  public render() {
    const { selectedValue } = this.props;
    return (
      <View style={styles.root}>
        <Picker selectedValue={selectedValue} onValueChange={this.handleChange}>
          <Picker.Item label="---" value="" />
          <Picker.Item label="Arme" value="Arme" />
          <Picker.Item label="Bauch" value="Bauch" />
          <Picker.Item label="Beine" value="Beine" />
          <Picker.Item label="Brust" value="Brust" />
          <Picker.Item label="Rücken" value="Rücken" />
          <Picker.Item label="Schultern" value="Schultern" />
          <Picker.Item label="Waden" value="Waden" />
        </Picker>
      </View>
    );
  }

  private handleChange = (value: string) => {
    console.log(value);
    this.props.onChange(this.props.name, value);
  };
}

const styles = StyleSheet.create({
  root: {
    width: '90%',
    alignSelf: 'center'
  }
});

export default CategoryPicker;
