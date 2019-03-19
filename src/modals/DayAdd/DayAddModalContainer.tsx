import { DatabaseProviderProps, withDatabase } from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import React, { Component } from 'react';
import DayAddForm from '../../components/DayAddForm';
import { ISaveDayParams } from '../../watermelondb/models/Day';
import Workout from '../../watermelondb/models/Workout';

interface IProps {
  closeModal: () => void;
  id: string;
  workout?: Workout;
  parentComponentId: string;
}

export class DayAddModalContainer extends Component<IProps> {
  saveDay = async (day: ISaveDayParams) => {
    await this.props.workout!.addDay(day);
    this.props.closeModal();
  };

  render() {
    return <DayAddForm description="" days={[]} submit={this.saveDay} />;
  }
}

const enhance = withObservables(['id'], ({ id, database }: IProps & DatabaseProviderProps) => ({
  workout: database.collections.get('workouts').findAndObserve(id!)
}));

export default withDatabase<IProps>(enhance(DayAddModalContainer));
