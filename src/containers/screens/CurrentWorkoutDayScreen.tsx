import React, { FC, Fragment } from 'react';
import SetList from '../../components/SetList';
import Day from '../../watermelondb/models/Day';
import Set from '../../watermelondb/models/Set';
import Workout from '../../watermelondb/models/Workout';

interface IProps {
  workout: Workout;
  day: Day;
  sets: Set[];
}

const CurrentWorkoutDayScreen: FC<IProps> = ({ workout, day, sets }) => {
  return (
    <Fragment>
      <SetList sets={sets} workout={workout} />
    </Fragment>
  );
};

export default CurrentWorkoutDayScreen;
