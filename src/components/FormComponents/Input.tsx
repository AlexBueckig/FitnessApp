import { Field, FieldProps } from 'formik';
import React, { SFC } from 'react';
import { Input } from 'react-native-elements';

interface IProps {
  value: string;
  name: string;
  label: string;
  placeholder?: string;
  error?: string;
}

const TextInput: SFC<IProps> = props => {
  const { label, error, value, placeholder, name } = props;
  return (
    <Field name={name}>
      {({ form }: FieldProps) => (
        <Input
          label={label}
          errorMessage={error}
          onChangeText={text => form.setFieldValue(name, text)}
          onBlur={() => form.setTouched({ [name]: true })}
          placeholder={placeholder || label}
          value={value}
        />
      )}
    </Field>
  );
};

export default TextInput;
