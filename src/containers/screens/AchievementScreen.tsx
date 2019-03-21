import React, { FC } from 'react';
import { Text } from 'react-native';
import Container from '../../components/Container';

interface IProps {}

const AchievementScreen: FC<IProps> = props => {
  return (
    <Container>
      <Text>Achievements</Text>
    </Container>
  );
};

export default AchievementScreen;
