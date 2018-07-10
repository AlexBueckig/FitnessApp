import React, { PureComponent } from 'react';
import { TextInput, View } from 'react-native';
import { IGetWorkoutById, ISaveWorkout, IWorkout } from '../types/workoutTypes';

interface IProps {
  getWorkoutById: (id: number) => IGetWorkoutById;
  saveWorkout: (workout: IWorkout) => ISaveWorkout;
  workout: IWorkout;
  id: number;
}

interface IState {
  workout: IWorkout;
}

class WorkoutAddScreen extends PureComponent<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    if (this.props.workout) {
      this.state = { workout: this.props.workout };
    } else {
      this.state = {
        workout: { id: this.props.id, comment: '' }
      };
    }
  }

  public onChange(value: string) {
    this.setState({ workout: { ...this.state.workout, comment: value } });
  }

  public render() {
    return (
      <View>
        <TextInput placeholder={'name'} onChangeText={this.onChange.bind(this)} value={this.state.workout.comment} />
      </View>
    );
  }
}

export default WorkoutAddScreen;
