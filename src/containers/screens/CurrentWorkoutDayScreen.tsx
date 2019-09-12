import React, { FC, Fragment } from 'react';
import ExercisesList from '../../components/SetList';
import Day from '../../watermelondb/models/Day';
import Exercise from '../../watermelondb/models/Exercise';
import Workout from '../../watermelondb/models/Workout';

interface IProps {
  workout: Workout;
  day: Day;
  exercises: Exercise[];
}

const CurrentWorkoutDayScreen: FC<IProps> = ({ workout, day, exercises }) => {
  return (
    <Fragment>
      <ExercisesList exercises={exercises} workout={workout} />
    </Fragment>
  );
};

export default CurrentWorkoutDayScreen;
