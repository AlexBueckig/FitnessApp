import React, { PureComponent } from 'react';
import { Alert, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import DayAddForm from '../components/DayAddForm';
import Day, { ISaveDayParams } from '../watermelondb/models/Day';

interface IProps {
  saveDay: (day: ISaveDayParams) => void;
  day: Day | undefined;
}

export default class DayAddScreen extends PureComponent<IProps> {
  public navigationButtonPressed(id: { buttonId: string; componentId: string }) {
    switch (id.buttonId) {
      case 'deleteDayButton':
        Alert.alert('Löschen bestätigen', 'Willst du diesen Tag wirklich löschen?', [
          { text: 'Abbrechen', onPress: undefined, style: 'cancel' },
          {
            text: 'OK',
            onPress: () => {
              Navigation.pop(id.componentId);
            }
          }
        ]);
        break;
      default:
        break;
    }
  }

  render() {
    const { day, saveDay } = this.props;
    return (
      <View style={{ padding: 16 }}>
        <DayAddForm description={(day && day.description) || ''} days={(day && day.days) || []} submit={saveDay} />
      </View>
    );
  }
}
