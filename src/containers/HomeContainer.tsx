import { Database, Q } from '@nozbe/watermelondb';
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import Workout from '../watermelondb/models/Workout';
import HomeScreen from './screens/HomeScreen';

interface IProps {
  workouts: Workout[];
  database?: Database;
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

  state = { quote: { text: '', author: '' } };

  constructor(props: IProps) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  componentDidAppear = () => {
    this.getQuote();
  };

  getQuote = async () => {
    try {
      let quote = await this.getCachedQuote();
      if (!quote) {
        quote = await this.fetchQuote();
        AsyncStorage.setItem('quote', JSON.stringify(quote));
      }
      this.setState({ quote });
      return quote;
    } catch (error) {
      console.log(error);
    }
  };

  getCachedQuote = async () => {
    try {
      const quote = await AsyncStorage.getItem('quote');
      if (quote !== null) {
        const { date } = JSON.parse(quote);
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const formattedToday = `${today.getFullYear()}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
        if (date === formattedToday) {
          return JSON.parse(quote);
        }
      }
      return undefined;
    } catch (error) {
      console.log(error);
    }
  };

  fetchQuote = async () => {
    console.log('Fetch...');
    const res = await fetch('https://quotes.rest/qod?category=inspire', {
      method: 'GET',
      headers: { Accept: 'application/json' }
    });
    const json = await res.json();
    const {
      contents: {
        quotes: [{ quote, author, date }]
      }
    } = json;
    return { text: quote, author, date };
  };

  render() {
    const { workouts } = this.props;
    return <HomeScreen workouts={workouts} quote={this.state.quote} />;
  }
}

const enhance = withObservables<IProps>([], ({ database }) => ({
  workouts: database!.collections
    .get<Workout>('workouts')
    .query(Q.where('active', true))
    .observe()
}));

export default withDatabase(enhance(HomeContainer));
