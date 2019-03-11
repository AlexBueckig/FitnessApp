import { DatabaseProviderProps, withDatabase } from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import DayAddScreen from '../screens/DayAddScreen';
import { iconsMap } from '../utils/AppIcons';
import Day, { ISaveDayParams } from '../watermelondb/models/Day';
import Workout from '../watermelondb/models/Workout';

interface IProps {
  id: string;
  componentId: string;
  workout: Workout;
  days: Day[];
}

export class DayAddContainer extends Component<IProps> {
  public static options() {
    return {
      topBar: {
        title: { text: 'Übung anlegen' },
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
    await this.props.workout.addDay(values);
    console.log(this.props);
  };

  render() {
    return <DayAddScreen day={undefined} saveDay={this.saveDay} />;
  }
}

const enhance = withObservables([], ({ database, id }: IProps & DatabaseProviderProps) => ({
  workout: database.collections.get<Workout>('workouts').findAndObserve(id)
}));

export default withDatabase(enhance(DayAddContainer));
