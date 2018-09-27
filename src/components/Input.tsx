import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';

interface IProps {
  value: string;
  name: string;
  label: string;
  placeholder?: string;
  error?: string;
  onChange: (name: string, text: string) => void;
  onTouch: (name: string) => void;
}

class TextInput extends PureComponent<IProps> {
  public render() {
    const { label, error, value, placeholder } = this.props;
    return (
      <View style={styles.root}>
        <Input
          label={label}
          errorMessage={error}
          onChangeText={this.handleChange}
          onBlur={this.handleTouch}
          placeholder={placeholder || label}
          value={value}
        />
      </View>
    );
  }

  private handleChange = (value: string) => {
    this.props.onChange(this.props.name, value);
  };

  private handleTouch = () => {
    this.props.onTouch(this.props.name);
  };
}

const styles = StyleSheet.create({
  root: {
    width: '90%',
    alignSelf: 'center'
  }
});

export default TextInput;
