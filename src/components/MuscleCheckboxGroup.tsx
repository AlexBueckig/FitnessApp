import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { CheckBox } from 'react-native-elements';

interface IProps {
  data: string;
  name: string;
  onChange: (name: string, data: string) => void;
}
// FIXME: JSON.stringify/JSON.parse entfernen und Problem richtig lösen...
class MuscleCheckboxGroup extends PureComponent<IProps> {
  public render() {
    const data = JSON.parse(this.props.data);
    return (
      <View>
        <CheckBox
          title="Anterior deltoid"
          onPress={this.handleChange.bind(this, 2)}
          checked={data.includes(2)}
          iconType="material"
          checkedIcon="check-box"
          uncheckedIcon="check-box-outline-blank"
        />
        <CheckBox
          title="Biceps brachii (Armbeuger)"
          onPress={this.handleChange.bind(this, 1)}
          checked={data.includes(1)}
          iconType="material"
          checkedIcon="check-box"
          uncheckedIcon="check-box-outline-blank"
        />
        <CheckBox
          title="Biceps femoris (Beinbeuger)"
          onPress={this.handleChange.bind(this, 11)}
          checked={data.includes(11)}
          iconType="material"
          checkedIcon="check-box"
          uncheckedIcon="check-box-outline-blank"
        />
        <CheckBox
          title="Brachialis (Oberarmmuskel)"
          onPress={this.handleChange.bind(this, 13)}
          checked={data.includes(13)}
          iconType="material"
          checkedIcon="check-box"
          uncheckedIcon="check-box-outline-blank"
        />
        <CheckBox
          title="Gastrocnemius (Waden)"
          onPress={this.handleChange.bind(this, 7)}
          checked={data.includes(7)}
          iconType="material"
          checkedIcon="check-box"
          uncheckedIcon="check-box-outline-blank"
        />
        <CheckBox
          title="Gluteus maximus (Po)"
          onPress={this.handleChange.bind(this, 8)}
          checked={data.includes(8)}
          iconType="material"
          checkedIcon="check-box"
          uncheckedIcon="check-box-outline-blank"
        />
        <CheckBox
          title="Latissimus dorsi (breiter Rückenmuskel)"
          onPress={this.handleChange.bind(this, 12)}
          checked={data.includes(12)}
          iconType="material"
          checkedIcon="check-box"
          uncheckedIcon="check-box-outline-blank"
        />
        <CheckBox
          title="Obliquus externus abdominis (schräger Bauchmuskel)"
          onPress={this.handleChange.bind(this, 14)}
          checked={data.includes(14)}
          iconType="material"
          checkedIcon="check-box"
          uncheckedIcon="check-box-outline-blank"
        />
        <CheckBox
          title="Pectoralis major (Brustmuskel)"
          onPress={this.handleChange.bind(this, 4)}
          checked={data.includes(4)}
          iconType="material"
          checkedIcon="check-box"
          uncheckedIcon="check-box-outline-blank"
        />
        <CheckBox
          title="Quadriceps femoris (Oberschenkelstrecker)"
          onPress={this.handleChange.bind(this, 10)}
          checked={data.includes(10)}
          iconType="material"
          checkedIcon="check-box"
          uncheckedIcon="check-box-outline-blank"
        />
        <CheckBox
          title="Rectus abdominis (Bauchmuskel)"
          onPress={this.handleChange.bind(this, 6)}
          checked={data.includes(6)}
          iconType="material"
          checkedIcon="check-box"
          uncheckedIcon="check-box-outline-blank"
        />
        <CheckBox
          title="Serratus anterior"
          onPress={this.handleChange.bind(this, 3)}
          checked={data.includes(3)}
          iconType="material"
          checkedIcon="check-box"
          uncheckedIcon="check-box-outline-blank"
        />
        <CheckBox
          title="Soleus"
          onPress={this.handleChange.bind(this, 15)}
          checked={data.includes(15)}
          iconType="material"
          checkedIcon="check-box"
          uncheckedIcon="check-box-outline-blank"
        />
        <CheckBox
          title="Trapezius"
          onPress={this.handleChange.bind(this, 9)}
          checked={data.includes(9)}
          iconType="material"
          checkedIcon="check-box"
          uncheckedIcon="check-box-outline-blank"
        />
        <CheckBox
          title="Triceps brachii (Armstrecker)"
          onPress={this.handleChange.bind(this, 5)}
          checked={data.includes(5)}
          iconType="material"
          checkedIcon="check-box"
          uncheckedIcon="check-box-outline-blank"
        />
      </View>
    );
  }

  public handleChange(id: string) {
    const data = JSON.parse(this.props.data);
    console.log(data);
    if (data.includes(id)) {
      const index = data.indexOf(id);
      data.splice(index, 1);
    } else {
      data.push(id);
    }
    this.props.onChange(this.props.name, JSON.stringify(data));
  }
}

export default MuscleCheckboxGroup;
