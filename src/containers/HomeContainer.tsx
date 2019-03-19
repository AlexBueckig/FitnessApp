import { Q } from '@nozbe/watermelondb';
import { DatabaseProviderProps, withDatabase } from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import HomeScreen from '../screens/HomeScreen';
import Workout from '../watermelondb/models/Workout';

interface IProps {
  workouts: Workout[];
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

const enhance = withObservables([], ({ database }: DatabaseProviderProps) => ({
  workouts: database.collections
    .get<Workout>('workouts')
    .query(Q.where('active', true))
    .observe()
}));

export default withDatabase(enhance(HomeContainer));
