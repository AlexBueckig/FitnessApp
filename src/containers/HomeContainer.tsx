import { Database, Q } from '@nozbe/watermelondb';
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { iconsMap } from '../utils/AppIcons';
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
    return {};
  }

  constructor(props: IProps) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  componentDidAppear() {
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        title: { text: 'Home' },
        rightButtons: [
          {
            id: 'showWorkoutLogButton',
            color: 'white',
            icon: iconsMap['date-range']
          }
        ]
      }
    });
  }

  navigationButtonPressed(id: { buttonId: string; componentId: string }) {
    switch (id.buttonId) {
      case 'showWorkoutLogButton':
        Navigation.push(this.props.componentId, {
          component: {
            name: 'WorkoutLogScreen'
          }
        });
        break;
      default:
        break;
    }
  }

  onPress = (workoutId: string, dayId: string, date: string) => {
    Navigation.push(this.props.componentId, {
      component: { name: 'CurrentWorkoutDayScreen', passProps: { workoutId, dayId, date } }
    });
  };

  render() {
    const { days } = this.props;
    const weekdays = getDaysByWeekday(days);

    return <HomeScreen weekdays={weekdays} onPress={this.onPress} />;
  }
}

const enhance = withObservables<IProps, {}>([], ({ database }) => ({
  days: database!.collections
    .get<Day>('days')
    .query(Q.on('workouts', 'active', true))
    .observeWithColumns(['description', 'days'])
}));

export default withDatabase(enhance(HomeContainer));
