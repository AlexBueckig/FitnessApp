import { Database } from '@nozbe/watermelondb';
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Navigation } from 'react-native-navigation';
import ExerciseAddScreen from '../screens/ExerciseAddScreen';
import { iconsMap } from '../utils/AppIcons';
import Exercise, { ISaveExerciseParams } from '../watermelondb/models/Exercise';

interface IProps {
  id: string;
  componentId: string;
  exercise: Exercise;
}

export class ExerciseEditContainer extends Component<IProps> {
  public static options() {
    return {
      topBar: {
        title: { text: 'Übung bearbeiten' },
        rightButtons: [
          {
            id: 'deleteExerciseButton',
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

  saveExercise = async (values: ISaveExerciseParams) => {
    await this.props.exercise.updateEntry(values);
  };

  render() {
    return <ExerciseAddScreen exercise={this.props.exercise} saveExercise={this.saveExercise} />;
  }

  public navigationButtonPressed(id: { buttonId: string; componentId: string }) {
    switch (id.buttonId) {
      case 'deleteExerciseButton':
        Alert.alert('Löschen bestätigen', 'Willst du diese Übung wirklich löschen?', [
          { text: 'Abbrechen', onPress: undefined, style: 'cancel' },
          {
            text: 'OK',
            onPress: async () => {
              await this.props.exercise.deleteEntry();
              Navigation.pop(id.componentId);
            }
          }
        ]);
        break;
      default:
        break;
    }
  }
}

const enhance = withObservables(['exercise'], ({ database, id }: { database: Database; id: string }) => {
  try {
    return {
      exercise: database.collections.get<Exercise>('exercises').findAndObserve(id)
    };
  } catch (err) {
    console.log(err);
  }
});

const EnhancedExerciseEditContainer = enhance(ExerciseEditContainer);

export default withDatabase(EnhancedExerciseEditContainer);