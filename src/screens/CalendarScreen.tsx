import React, { PureComponent } from 'react';
// @ts-ignore
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales.de = {
  monthNames: [
    'Januar',
    'Februar',
    'März',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Dezember'
  ],
  monthNamesShort: ['Jan.', 'Feb.', 'März', 'Apr.', 'Mai', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Okt.', 'Nov.', 'Dez.'],
  dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
  dayNamesShort: ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.']
};

LocaleConfig.defaultLocale = 'de';

export default class CalendarScren extends PureComponent {
  public render() {
    return <Calendar firstDay={1}>Kalendarscreen</Calendar>;
  }
}
