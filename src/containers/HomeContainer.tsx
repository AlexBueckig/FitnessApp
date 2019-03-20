import { Database, Q } from '@nozbe/watermelondb';
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import Workout from '../watermelondb/models/Workout';
import HomeScreen from './screens/HomeScreen';

interface IProps {
  workouts: Workout[];
  database?: Database;
}

class HomeContainer extends Component<IProps> {
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

  render() {
    const { workouts } = this.props;
    return <HomeScreen workouts={workouts} />;
  }
}

const enhance = withObservables<IProps>([], ({ database }) => ({
  workouts: database!.collections
    .get<Workout>('workouts')
    .query(Q.where('active', true))
    .observe()
}));

export default withDatabase(enhance(HomeContainer));
