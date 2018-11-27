import React, { PureComponent } from 'react';
import { SectionList, View } from 'react-native';
import { Divider, ListItem, Text } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import AddButton from '../components/AddButton';
import { ListEmptyComponent } from '../components/ListComponents';
import styles from '../styles';
import { IDeleteExercise, IExercises, IGetExercises } from '../types/exerciseTypes';

interface IProps {
  exercises: IExercises;
  getExercises: () => IGetExercises;
  deleteExercise: (id: number) => IDeleteExercise;
  componentId: string;
  isFetching: boolean;
}

export default class ExerciseScreen extends PureComponent<IProps> {
  static get options() {
    return {
      topBar: {
        title: { text: 'Meine Übungen' }
      }
    };
  }

  constructor(props: IProps) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  public componentDidAppear() {
    this.props.getExercises();
  }

  public render() {
    return (
      <View style={styles.layout.main}>
        <AddButton onPress={this.onPress.bind(this, 0)} />
        <SectionList
          sections={this.props.exercises.results}
          renderItem={({ item }) => (
            <ListItem key={item.id} title={item.name} chevron={true} onPress={this.onPress.bind(this, item.id)} />
          )}
          ItemSeparatorComponent={Divider}
          renderSectionHeader={({ section: { title } }) => (
            <Text
              style={{
                fontSize: 16,
                backgroundColor: '#14C788',
                color: 'white',
                textAlign: 'center',
                elevation: 1
              }}
            >
              {title}
            </Text>
          )}
          keyExtractor={item => item.id}
          ListEmptyComponent={ListEmptyComponent}
          SectionSeparatorComponent={Divider}
        />
      </View>
    );
  }

  private onPress(id: number) {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'ExerciseScreen.Add',
        passProps: {
          id
        }
      }
    });
  }
}
