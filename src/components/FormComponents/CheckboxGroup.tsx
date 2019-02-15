import { FieldArray } from 'formik';
import React, { SFC } from 'react';
import Checkbox from './Checkbox';

interface IProps {
  values: boolean[];
  name: string;
  label: string[];
}

const CheckboxGroup: SFC<IProps> = props => {
  const { values, name, label } = props;
  return (
    <FieldArray name={name}>
      {() =>
        values.map((value, index) => (
          <Checkbox name={`${name}.${index}`} checked={value} label={label[index] || ''} key={`${value}${index}`} />
        ))
      }
    </FieldArray>
  );
};

export default CheckboxGroup;
