import { Database } from '@nozbe/watermelondb';
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import React, { Component } from 'react';
import WorkoutEditForm from '../../components/WorkoutEditForm';
import Workout, { ISaveWorkoutParams } from '../../watermelondb/models/Workout';

interface IProps {
  closeModal: () => void;
  componentId: string;
  parentComponentId: string;
  database: Database;
  id: string;
  workout?: Workout;
}

export class WorkoutEditModalContainer extends Component<IProps> {
  saveWorkout = async (workout: ISaveWorkoutParams) => {
    await this.props.workout!.updateEntry(workout);
    this.props.closeModal();
  };

  render() {
    const { workout } = this.props;
    return <WorkoutEditForm name={workout!.name} active={workout!.active} submit={this.saveWorkout} />;
  }
}

const enhance = withObservables<IProps>(['id'], ({ database, id }) => ({
  workout: database.collections.get<Workout>('workouts').findAndObserve(id)
}));

export default withDatabase(enhance(WorkoutEditModalContainer));
