import { Database } from '@nozbe/watermelondb';
import { DatabaseProviderProps, withDatabase } from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import React, { Component } from 'react';
import DayAddExerciseForm from '../../components/DayAddExerciseForm';
import Day from '../../watermelondb/models/Day';
import Exercise from '../../watermelondb/models/Exercise';
import { ISaveSetParams } from '../../watermelondb/models/Set';

interface IProps {
  closeModal: () => void;
  id: string;
  day?: Day;
  exercises?: Exercise[];
  database: Database;
}

export class DayAddExerciseModalContainer extends Component<IProps> {
  saveSet = async (set: ISaveSetParams) => {
    await this.props.day!.addSet(set);
    this.props.closeModal();
  };

  render() {
    return <DayAddExerciseForm submit={this.saveSet} exercises={this.props.exercises!} />;
  }
}

const enhance = withObservables<IProps>(['id'], ({ id, database }: IProps & DatabaseProviderProps) => ({
  day: database.collections.get('days').findAndObserve(id!),
  exercises: database.collections
    .get('exercises')
    .query()
    .observe()
}));

export default withDatabase(enhance(DayAddExerciseModalContainer));
