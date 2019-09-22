import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React, { FC, useState } from 'react';
import { FlatList, ListRenderItemInfo, ScrollView } from 'react-native';
import { Calendar, DateObject, DotMarking } from 'react-native-calendars';
import WorkoutlogListItem from '../../components/ListComponents/WorkoutlogListItem';
import Workoutlog from '../../watermelondb/models/Workoutlog';

dayjs.extend(customParseFormat);

interface IProps {
  logs: Workoutlog[];
}

const getDatesFromLogs = (logs: Workoutlog[]) => {
  const dates: { [date: string]: DotMarking } = {};
  logs.forEach(
    log =>
      (dates[dayjs(log.trainingDay, { format: 'DD.MM.YYYY' }).format('YYYY-MM-DD')] = {
        marked: true,
        dotColor: '#14C788'
      })
  );
  return dates;
};

const WorkoutLogScreen: FC<IProps> = ({ logs }) => {
  const [dates, setDates] = useState(getDatesFromLogs(logs));
  const [selectedDay, setSelectedDay] = useState('');

  const currentDay: Workoutlog[] = logs.filter(log => {
    return dayjs(log.trainingDay, { format: 'DD.MM.YYYY' }).format('YYYY-MM-DD') === selectedDay;
  });

  const groupedByExercise = currentDay.reduce((groups: { [key: string]: Workoutlog[] }, item) => {
    const val = item.exercise.id;
    if (val) {
      groups[val] = groups[val] || [];
      groups[val].push(item);
    }
    return groups;
  }, {});

  return (
    <ScrollView>
      <Calendar
        firstDay={1}
        markedDates={dates}
        onDayPress={(day: DateObject) => {
          const datesCopy = { ...dates };
          Object.keys(datesCopy).forEach(date => (datesCopy[date] = { ...dates[date] }));
          if (selectedDay !== '') {
            delete datesCopy[selectedDay].selected;
            if (Object.keys(datesCopy[selectedDay]).length === 0) {
              delete datesCopy[selectedDay];
            }
          }
          setSelectedDay(day.dateString);
          setDates({
            ...datesCopy,
            [day.dateString]: { ...dates[day.dateString], selected: true, selectedColor: '#14C788' }
          });
        }}
      />
      <FlatList
        data={Object.keys(groupedByExercise).map(key => ({
          exerciseId: key,
          items: groupedByExercise[key]
        }))}
        renderItem={({ item }: ListRenderItemInfo<{ exerciseId: string; items: Workoutlog[] }>) => {
          return <WorkoutlogListItem item={item} />;
        }}
        keyExtractor={item => `WorkoutLogScreen-${item.exerciseId}`}
      />
    </ScrollView>
  );
};

export default WorkoutLogScreen;
