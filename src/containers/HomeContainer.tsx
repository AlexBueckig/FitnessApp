import { Database, Q } from '@nozbe/watermelondb';
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { getDaysByWeekday } from '../utils/ListFunctions';
import Day from '../watermelondb/models/Day';
import Workout from '../watermelondb/models/Workout';
import HomeScreen from './screens/HomeScreen';

interface IProps {
  workouts: Workout[];
  days: Day[];
  database?: Database;
  componentId: string;
}

interface IState {
  quote: {
    author: string;
    text: string;
  };
}

class HomeContainer extends Component<IProps, IState> {
  public static options() {
    return {
      topBar: {
        title: { text: 'Home' }
      }
    };
  }

  constructor(props: IProps) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  onPress = (workoutId: string, dayId: string) => {
    Navigation.push(this.props.componentId, {
      component: { name: 'CurrentWorkoutDayScreen', passProps: { workoutId, dayId } }
    });
  };

  render() {
    const { days } = this.props;
    const weekdays = getDaysByWeekday(days);

    return <HomeScreen weekdays={weekdays} onPress={this.onPress} />;
  }
}

const enhance = withObservables<IProps>([], ({ database }) => ({
  days: database!.collections
    .get<Day>('days')
    .query(Q.on('workouts', 'active', true))
    .observeWithColumns(['description', 'days'])
}));

export default withDatabase(enhance(HomeContainer));
