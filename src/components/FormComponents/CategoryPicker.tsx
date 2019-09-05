import { Field, FieldProps } from 'formik';
import React, { FC, Fragment } from 'react';
import { Picker, View } from 'react-native';
import { Text } from 'react-native-elements';
import styles from '../../styles';

interface IProps {
  name: string;
  title: string;
  selectedValue: string;
  categories: string[];
  error?: string;
}

const CategoryPicker: FC<IProps> = props => {
  const { error, categories, selectedValue, title, name } = props;
  return (
    <View style={styles.layout.container}>
      <Field>
        {({ form }: FieldProps) => (
          <Fragment>
            <Text style={styles.typography.label}>{title}</Text>
            <Picker
              mode={'dialog'}
              selectedValue={selectedValue}
              onValueChange={value => form.setFieldValue(name, value)}
            >
              <Picker.Item label="---" value="" />
              {categories.map((category, index) => (
                <Picker.Item key={`${index}${category}`} value={category} label={category} />
              ))}
            </Picker>
            {error && <Text style={{ color: 'red' }}>{error}</Text>}
          </Fragment>
        )}
      </Field>
    </View>
  );
};

export default CategoryPicker;
