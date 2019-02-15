import { Field, FieldProps } from 'formik';
import React, { SFC } from 'react';
import { CheckBox } from 'react-native-elements';

interface IProps {
  checked: boolean;
  name: string;
  label: string;
}

const Checkbox: SFC<IProps> = props => {
  const { checked, name, label } = props;
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <CheckBox
          checked={checked}
          iconType="material"
          checkedIcon="check-box"
          uncheckedIcon="check-box-outline-blank"
          onPress={form.setFieldValue.bind(null, name, !checked)}
          title={label}
        />
      )}
    </Field>
  );
};

export default Checkbox;
