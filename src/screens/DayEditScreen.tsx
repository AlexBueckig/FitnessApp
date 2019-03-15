import React, { PureComponent } from 'react';
import { Alert } from 'react-native';
import { Navigation } from 'react-native-navigation';
import DayAddForm from '../components/DayAddForm';
import Day, { ISaveDayParams } from '../watermelondb/models/Day';
import Exercise from '../watermelondb/models/Exercise';

interface IProps {
  saveDay: (day: ISaveDayParams) => void;
  day: Day;
  exercises: Exercise[];
}

export default class DayEditScreen extends PureComponent<IProps> {
  public navigationButtonPressed(id: { buttonId: string; componentId: string }) {
    switch (id.buttonId) {
      case 'deleteDayButton':
        Alert.alert('Löschen bestätigen', 'Willst du diesen Tag wirklich löschen?', [
          { text: 'Abbrechen', onPress: undefined, style: 'cancel' },
          {
            text: 'OK',
            onPress: () => {
              Navigation.pop(id.componentId);
            },
            style: 'destructive'
          }
        ]);
        break;
      default:
        break;
    }
  }

  render() {
    const { day, saveDay } = this.props;
    return <DayAddForm description={(day && day.description) || ''} days={(day && day.days) || []} submit={saveDay} />;
  }
}
