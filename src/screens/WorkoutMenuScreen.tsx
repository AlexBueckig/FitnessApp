import React, { PureComponent } from 'react';
import { ScrollView, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import CardImageBackground from '../components/CardImageBackground';

import styles from '../styles';

interface IProps {
  componentId: string;
}

export default class WorkoutMenuScreen extends PureComponent<IProps> {
  static get options() {
    return {
      topBar: {
        title: { text: 'Workoutmenü' }
      }
    };
  }

  private images = [
    require('../../res/images/download2.jpg'),
    require('../../res/images/ausrustung-crossfit-fitness-669578-2.jpg'),
    require('../../res/images/anstrengung-ausbildung-beine-841125-2.jpg')
  ];

  public onPress(target: string) {
    Navigation.push(this.props.componentId, {
      component: {
        name: target
      }
    });
  }

  public render() {
    return (
      <ScrollView style={styles.layout.main}>
        <CardImageBackground
          title="Trainingspläne"
          onPress={this.onPress.bind(this, 'WorkoutScreen')}
          image={this.images[0]}
        >
          <Text style={styles.typography.cardBody}>Füge Tagespläne zu Trainingsplänen zusammen</Text>
        </CardImageBackground>
        <CardImageBackground title="Tagespläne" onPress={this.onPress.bind(this, 'DayScreen')} image={this.images[1]}>
          <Text style={styles.typography.cardBody}>Erstelle einzelne, individuelle Tagespläne</Text>
        </CardImageBackground>
        <CardImageBackground title="Übungen" onPress={this.onPress.bind(this, 'ExerciseScreen')} image={this.images[2]}>
          <Text style={styles.typography.cardBody}>Lege deine eigenen Übungen an</Text>
        </CardImageBackground>
      </ScrollView>
    );
  }
}
