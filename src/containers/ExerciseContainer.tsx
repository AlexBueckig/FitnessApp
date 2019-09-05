import { Database } from '@nozbe/watermelondb';
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { getExercisesByCategory } from '../utils/ListFunctions';
import Exercise from '../watermelondb/models/Exercise';
import ExerciseScreen from './screens/ExerciseScreen';

interface IProps {
  exercises: Exercise[];
  componentId: string;
  database?: Database;
}

export class ExerciseContainer extends Component<IProps> {
  public static options() {
    return {
      topBar: {
        title: { text: 'Übungen' }
      }
    };
  }

  constructor(props: IProps) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  render() {
    return <ExerciseScreen exercises={getExercisesByCategory(this.props.exercises)} onPress={this.onPress} />;
  }

  private onPress = (id: string | undefined = undefined) => {
    let type = 'Add';
    if (id) {
      type = 'Edit';
    }
    Navigation.push(this.props.componentId, {
      component: {
        name: `ExerciseScreen.${type}`,
        passProps: {
          id
        }
      }
    });
  };
}

const enhance = withObservables<IProps>([], ({ database }) => ({
  exercises: database!.collections
    .get('exercises')
    .query()
    .observeWithColumns(['category', 'name'])
}));

const EnhancedExerciseContainer = withDatabase(enhance(ExerciseContainer));

export default EnhancedExerciseContainer;
