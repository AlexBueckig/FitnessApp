import React, { FC } from 'react';
import Container from '../../components/Container';
import DayAddForm from '../../components/DayAddForm';
import Day, { ISaveDayParams } from '../../watermelondb/models/Day';
import Exercise from '../../watermelondb/models/Exercise';

interface IProps {
  saveDay: (day: ISaveDayParams) => void;
  day: Day;
  exercises: Exercise[];
}

const DayEditScreen: FC<IProps> = ({ day, saveDay }) => {
  return (
    <Container>
      <DayAddForm description={day.description} days={day.days} submit={saveDay} />
    </Container>
  );
};

export default DayEditScreen;
