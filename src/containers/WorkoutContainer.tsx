import { Database } from '@nozbe/watermelondb';
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import React, { Component } from 'react';
import { Navigation, OptionsModalPresentationStyle } from 'react-native-navigation';
import Workout from '../watermelondb/models/Workout';
import WorkoutScreen from './screens/WorkoutScreen';

interface IProps {
  workouts: Workout[];
  componentId: string;
  database?: Database;
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
    return <WorkoutScreen workouts={this.props.workouts} onEdit={this.onEdit} onAdd={this.onAdd} />;
  }

  private onEdit = (id: string) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'WorkoutScreen.Edit',
        passProps: {
          id
        }
      }
    });
  };

  private onAdd = () => {
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

const enhance = withObservables<IProps, {}>([], ({ database }) => ({
  workouts: database!.collections
    .get('workouts')
    .query()
    .observe()
}));

const EnhancedWorkoutContainer = withDatabase(enhance(WorkoutContainer));

export default EnhancedWorkoutContainer;
