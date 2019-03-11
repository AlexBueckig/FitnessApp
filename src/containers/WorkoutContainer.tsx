import { DatabaseProviderProps, withDatabase } from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import React, { Component } from 'react';
import { Navigation, OptionsModalPresentationStyle } from 'react-native-navigation';
import WorkoutScreen from '../screens/WorkoutScreen';
import Workout from '../watermelondb/models/Workout';

interface IProps {
  workouts: Workout[];
  componentId: string;
}

export class WorkoutContainer extends Component<IProps> {
  public static options() {
    return {
      topBar: {
        title: { text: 'Workouts' }
      }
    };
  }

  constructor(props: IProps) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  render() {
    return <WorkoutScreen workouts={this.props.workouts} onPress={this.onPress} onFabPress={this.onFabPress} />;
  }

  private onPress = (id: string | undefined = undefined) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: `WorkoutScreen.${id ? 'Edit' : 'Add'}`,
        passProps: {
          id
        }
      }
    });
  };

  private onFabPress = () => {
    Navigation.showModal({
      component: {
        name: 'WorkoutAddModal',
        passProps: {
          parentComponentId: this.props.componentId
        },
        options: {
          layout: {
            backgroundColor: 'rgba(0,0,0,0.7)'
          },
          modalPresentationStyle: OptionsModalPresentationStyle.overCurrentContext
        }
      }
    });
  };
}

const enhance = withObservables([], ({ database }: DatabaseProviderProps) => {
  return {
    workouts: database.collections
      .get('workouts')
      .query()
      .observe()
  };
});

const EnhancedWorkoutContainer = withDatabase(enhance(WorkoutContainer));

export default EnhancedWorkoutContainer;
