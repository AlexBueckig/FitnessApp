import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';

interface IProps {
  componentId: string;
}

export default class WorkoutMenuScreen extends PureComponent<IProps> {
  public onPress(target: string) {
    console.log('Button pressed');
    Navigation.push(this.props.componentId, {
      component: {
        name: target
      }
    });
  }

  public render() {
    return (
      <View>
        <Button onPress={this.onPress.bind(this, 'WorkoutScreen')} title="WorkoutScreen" />
        <Button onPress={this.onPress.bind(this, 'DayScreen.Add')} title="DayScreen" />
      </View>
    );
  }
}
