import React, { FC } from 'react';
import DayAddForm from '../components/DayAddForm';
import Day, { ISaveDayParams } from '../watermelondb/models/Day';
import Exercise from '../watermelondb/models/Exercise';

interface IProps {
  saveDay: (day: ISaveDayParams) => void;
  day: Day;
  exercises: Exercise[];
}

const DayEditScreen: FC<IProps> = ({ day, saveDay }) => {
  return <DayAddForm description={(day && day.description) || ''} days={(day && day.days) || []} submit={saveDay} />;
};

export default DayEditScreen;
