import { Field, FieldProps } from 'formik';
import React, { SFC } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import styles from '../../styles';

interface IItem {
  id: number;
  name: string;
}

interface IProps {
  name: string;
  selectedItems: number[];
  label: string;
  items: IItem[];
}

const MultiPicker: SFC<IProps> = props => {
  const { name, items, selectedItems, label } = props;
  return (
    <Field>
      {({ form }: FieldProps) => (
        <View style={{ width: '90%' }}>
          <Text style={styles.typography.label}>{label}</Text>
          <SectionedMultiSelect
            items={items}
            selectedItems={selectedItems}
            onSelectedItemsChange={(values: number[]) => form.setFieldValue(name, values)}
            uniqueKey="id"
            hideSearch={true}
            onConfirm={() => form.setTouched({ [name]: true })}
          />
        </View>
      )}
    </Field>
  );
};

export default MultiPicker;
