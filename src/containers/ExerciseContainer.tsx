import { Database } from '@nozbe/watermelondb';
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import ExerciseScreen from '../screens/ExerciseScreen';
import Exercise from '../watermelondb/models/Exercise';

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
    return <ExerciseScreen exercises={this.processExercises(this.props.exercises)} onPress={this.onPress} />;
  }

  private onPress = (id: string | undefined = undefined) => {
    console.log(id);
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

  private processExercises = (exercises: Exercise[]) => {
    const processedExercises: { [key: string]: Exercise[] } = {};
    exercises.map(exercise => {
      if (!processedExercises[exercise.category]) {
        processedExercises[exercise.category] = [];
      }
      processedExercises[exercise.category].push(exercise);
    });
    return Object.entries(processedExercises).map(([key, value]) => ({ title: key, data: value }));
  };
}

const enhance = withObservables<IProps>([], ({ database }) => ({
  exercises: database!.collections
    .get('exercises')
    .query()
    .observeWithColumns(['category'])
}));

const EnhancedExerciseContainer = withDatabase(enhance(ExerciseContainer));

export default EnhancedExerciseContainer;
