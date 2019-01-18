import React, { PureComponent } from 'react';
import { Picker, View } from 'react-native';
import { Text } from 'react-native-elements';
import styles from '../styles';

interface IProps {
  name: string;
  title: string;
  selectedValue: string;
  onChange: (name: string, text: string) => void;
  categories: string[];
  onBlur: (name: string) => void;
  error?: string;
}

class CategoryPicker extends PureComponent<IProps> {
  public render() {
    const { selectedValue, title } = this.props;
    return (
      <View style={{ width: '90%' }}>
        <Text style={styles.typography.label}>{title}</Text>
        <Picker selectedValue={selectedValue} onValueChange={this.handleChange}>
          <Picker.Item label="---" value="" />
          {this.props.categories.map((category, index) => (
            <Picker.Item key={index} value={category} label={category} />
          ))}
        </Picker>
        {this.props.error && <Text style={{ color: 'red' }}>{this.props.error}</Text>}
      </View>
    );
  }

  private handleChange = (value: string) => {
    this.props.onBlur(this.props.name);
    this.props.onChange(this.props.name, value);
  };
}

export default CategoryPicker;
