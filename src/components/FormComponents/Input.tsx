import { Field, FieldProps } from 'formik';
import React, { PureComponent } from 'react';
import { KeyboardType, StyleProp, ViewStyle } from 'react-native';
import { Input } from 'react-native-elements';
import styles from '../../styles';

interface IProps {
  value: string;
  name: string;
  label: string;
  keyboardType?: KeyboardType;
  placeholder?: string;
  error?: string;
  style?: StyleProp<ViewStyle>;
}

interface IState {
  isFocused: boolean;
}

class TextInput extends PureComponent<IProps, IState> {
  public state = { isFocused: false };
  public render() {
    const { label, error, value, placeholder, name, style, keyboardType } = this.props;

    return (
      <Field name={name}>
        {({ form }: FieldProps) => (
          <Input
            label={label}
            labelStyle={[
              styles.typography.label,
              {
                marginBottom: -10
              }
            ]}
            onChangeText={text => form.setFieldValue(name, text)}
            onBlur={() => {
              form.setTouched({ [name]: true });
              this.onBlur();
            }}
            onFocus={this.onFocus}
            placeholder={placeholder || label}
            value={value}
            inputStyle={{ fontSize: 16 }}
            underlineColorAndroid={error ? 'red' : this.state.isFocused ? 'green' : 'grey'}
            errorMessage={error}
            errorStyle={{ fontSize: 12, marginTop: -8 }}
            inputContainerStyle={{ borderBottomWidth: 0, marginHorizontal: -4 }}
            containerStyle={[style, { marginBottom: 16, paddingHorizontal: 0 }]}
            keyboardType={keyboardType || 'default'}
          />
        )}
      </Field>
    );
  }

  private onFocus = () => {
    this.setState({ isFocused: true });
  };

  private onBlur = () => {
    this.setState({ isFocused: false });
  };
}

export default TextInput;
