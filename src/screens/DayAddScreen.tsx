import React, { PureComponent } from 'react';
import { Alert, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import DayAddForm from '../components/DayAddForm';
import { IDay, IDeleteDay, IGetDayById, ISaveDay } from '../types/dayTypes';
import { IExercises, IGetExercises } from '../types/exerciseTypes';
import { iconsMap } from '../utils/AppIcons';

interface IProps {
  getDayById: (id: number) => IGetDayById;
  saveDay: (day: IDay) => ISaveDay;
  deleteDay: (id: number) => IDeleteDay;
  getExercises: () => IGetExercises;
  exercises: IExercises;
  day: IDay;
  id: number;
  isFetching: boolean;
}

export default class DayAddScreen extends PureComponent<IProps> {
  public static options() {
    return {
      topBar: {
        title: { text: 'Trainingsplan' },
        rightButtons: [
          {
            id: 'deleteDayButton',
            text: 'LÖSCHEN',
            color: 'white',
            icon: iconsMap.delete
          }
        ]
      }
    };
  }

  constructor(props: IProps) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  public componentDidAppear() {
    this.props.getDayById(this.props.id);
    this.props.getExercises();
  }

  public navigationButtonPressed(id: { buttonId: string; componentId: string }) {
    switch (id.buttonId) {
      case 'deleteDayButton':
        Alert.alert('Löschen bestätigen', 'Willst du diesen Tag wirklich löschen?', [
          { text: 'Abbrechen', onPress: undefined, style: 'cancel' },
          {
            text: 'OK',
            onPress: () => {
              if (this.props.id !== 0) {
                this.props.deleteDay(this.props.id);
              }
              Navigation.pop(id.componentId);
            }
          }
        ]);
        break;
      default:
        break;
    }
  }

  public render() {
    return (
      <View style={{ marginHorizontal: 16 }}>
        <DayAddForm day={this.props.day} handleSubmit={this.handleSubmit} exercises={this.props.exercises} />
      </View>
    );
  }

  public handleSubmit = (values: IDay) => {
    this.props.saveDay({ ...values });
  };
}
