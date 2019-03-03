import { Database } from '@nozbe/watermelondb';
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import { RootModel } from '../watermelondb/';
import Exercise from '../watermelondb/models/Exercise';
import TestProvider from './Provider';

interface IProps {
  exercises: Exercise[];
}

const Test = withDatabase(
  withObservables(['exercises'], ({ database }: { database: Database }) => ({
    exercises: database.collections
      .get('exercises')
      .query()
      .observe()
  }))(({ exercises }: { exercises: Exercise[] }) => {
    return (
      <View>
        <Button
          title="Add Exercise"
          onPress={() => {
            RootModel.createExercise('Test', 'Beine');
          }}
        />
        {exercises.map((exercise, index) => (
          <Text key={index}>{exercise.name}</Text>
        ))}
      </View>
    );
  })
);

class WatermelonTest extends Component<IProps> {
  public render() {
    return (
      <TestProvider>
        <Test />
      </TestProvider>
    );
  }
}

export default WatermelonTest;
