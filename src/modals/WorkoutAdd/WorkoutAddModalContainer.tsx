import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import WorkoutAddForm from '../../components/WorkoutEditForm';
import { RootModel } from '../../watermelondb';
import { ISaveWorkoutParams } from '../../watermelondb/models/Workout';

interface IProps {
  closeModal: () => void;
  componentId: string;
  parentComponentId: string;
}

export class WorkoutAddModalContainer extends Component<IProps> {
  saveWorkout = async (workout: ISaveWorkoutParams) => {
    const newWorkout = await RootModel.createWorkout(workout.name);
    this.props.closeModal();
    Navigation.push(this.props.parentComponentId, {
      component: {
        name: 'WorkoutScreen.Edit',
        passProps: {
          id: newWorkout.id
        }
      }
    });
  };

  render() {
    return <WorkoutAddForm name="" active={false} submit={this.saveWorkout} />;
  }
}

export default WorkoutAddModalContainer;
