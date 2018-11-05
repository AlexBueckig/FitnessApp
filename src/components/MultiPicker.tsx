import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import styles from '../styles';

interface IItem {
  id: number;
  name: string;
}

interface IProps {
  name: string;
  selectedItems: number[];
  label: string;
  items: IItem[];
  onChange: (name: string, items: number[]) => void;
}

interface IState {
  selectedItems: number[];
}

class MultiPicker extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedItems: props.selectedItems
    };
  }

  public render() {
    const { items, label } = this.props;
    return (
      <View style={styles1.root}>
        <Text style={styles.typography.label}>{label}</Text>
        <SectionedMultiSelect
          items={items}
          selectedItems={this.state.selectedItems}
          onSelectedItemsChange={this.handleChange.bind(this)}
          uniqueKey="id"
          hideSearch={true}
        />
      </View>
    );
  }

  private handleChange = (values: number[]) => {
    this.props.onChange(this.props.name, values);
    this.setState({ selectedItems: values });
  };
}

const styles1 = StyleSheet.create({
  root: {
    width: '90%',
    alignSelf: 'center'
  }
});

export default MultiPicker;
