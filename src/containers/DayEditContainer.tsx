import { Database } from '@nozbe/watermelondb';
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { iconsMap } from '../utils/AppIcons';
import Day, { ISaveDayParams } from '../watermelondb/models/Day';
import Exercise from '../watermelondb/models/Exercise';
import DayEditScreen from './screens/DayEditScreen';

interface IProps {
  id: string;
  componentId: string;
  day: Day;
  exercises: Exercise[];
  database?: Database;
}

export class DayEditContainer extends Component<IProps> {
  public static options() {
    return {
      topBar: {
        title: { text: 'Tag anlegen' },
        rightButtons: [
          {
            id: 'deleteDayButton',
            text: 'LÖSCHEN',
            color: 'white',
            icon: iconsMap.delete
          }
        ]
      }
    };
  }

  constructor(props: IProps) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  navigationButtonPressed(id: { buttonId: string; componentId: string }) {
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

  saveDay = async (values: ISaveDayParams) => {
    await this.props.day.updateEntry(values);
    Navigation.pop(this.props.componentId);
  };

  render() {
    return <DayEditScreen day={this.props.day} saveDay={this.saveDay} exercises={this.props.exercises} />;
  }
}

const enhance = withObservables<IProps>([], ({ database, id }) => ({
  day: database!.collections.get<Day>('days').findAndObserve(id),
  exercises: database!.collections
    .get<Exercise>('exercises')
    .query()
    .observe()
}));

export default withDatabase(enhance(DayEditContainer));
