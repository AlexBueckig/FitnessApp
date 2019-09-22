import { Database } from '@nozbe/watermelondb';
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import React, { PureComponent } from 'react';
import { Navigation } from 'react-native-navigation';
import Workoutlog from '../watermelondb/models/Workoutlog';
import WorkoutLogScreen from './screens/WorkoutLogScreen';

interface IProps {
  componentId: string;
  database?: Database;
  days: Workoutlog[];
}

class WorkoutLogContainer extends PureComponent<IProps> {
  public static options() {
    return {
      topBar: {
        title: 'Log'
      }
    };
  }

  constructor(props: IProps) {
    super(props);
    Navigation.events.bind(this);
  }

  componentDidAppear() {
    Navigation.mergeOptions(this.props.componentId, {
      topBar: { title: { text: 'Log' } }
    });
  }

  render() {
    const { days } = this.props;
    return <WorkoutLogScreen logs={days} />;
  }
}

// TODO: Refactor workoutlog into 2 tables
const enhance = withObservables<IProps, {}>([], ({ database }) => ({
  days: database!.collections
    .get<Workoutlog>('workoutlog')
    .query()
    .observeWithColumns(['training_day'])
}));

export default withDatabase(enhance(WorkoutLogContainer));
