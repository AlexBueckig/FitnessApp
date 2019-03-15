import { DatabaseProviderProps, withDatabase } from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import DayEditScreen from '../screens/DayEditScreen';
import { iconsMap } from '../utils/AppIcons';
import Day, { ISaveDayParams } from '../watermelondb/models/Day';
import Exercise from '../watermelondb/models/Exercise';

interface IProps {
  id: string;
  componentId: string;
  day: Day;
  exercises: Exercise[];
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

  saveDay = async (values: ISaveDayParams) => {
    await this.props.day.updateEntry(values);
  };

  render() {
    return <DayEditScreen day={this.props.day} saveDay={this.saveDay} exercises={this.props.exercises} />;
  }
}

const enhance = withObservables([], ({ database, id }: IProps & DatabaseProviderProps) => ({
  day: database.collections.get<Day>('days').findAndObserve(id),
  exercises: database.collections
    .get<Exercise>('exercises')
    .query()
    .observe()
}));

export default withDatabase(enhance(DayEditContainer));