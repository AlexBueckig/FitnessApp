/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import daysjs from 'dayjs';
import 'dayjs/locale/de';
import 'es6-symbol/implement';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/containers';
import { iconsMap } from './src/utils/AppIcons';

daysjs.locale('de');

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    topBar: {
      title: { color: 'white', alignment: 'center', fontSize: 22 },
      buttonColor: 'white',
      backButton: {
        color: 'white'
      },
      background: { color: '#14C788' }
    },
    bottomTabs: {
      titleDisplayMode: 'alwaysShow'
    },
    bottomTab: {
      iconColor: 'grey',
      selectedIconColor: '#14C788'
    }
  });
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'FeedScreen',
                    options: {
                      topBar: {
                        title: {
                          text: 'Home'
                        },
                        rightButtons: [
                          {
                            id: 'showWorkoutLogButton',
                            color: 'white',
                            icon: iconsMap['date-range']
                          }
                        ]
                      }
                    }
                  }
                }
              ],
              options: {
                bottomTab: {
                  text: 'Home',
                  icon: require('./res/icons/home.png')
                }
              }
            }
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'WorkoutMenuScreen'
                  }
                }
              ],
              options: {
                bottomTab: {
                  text: 'Workout',
                  icon: require('./res/icons/weight-lifter.png')
                }
              }
            }
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'AchievementScreen',
                    passProps: {
                      text: 'This is tab 2'
                    }
                  }
                }
              ],
              options: {
                bottomTab: {
                  text: 'Statistik',
                  icon: require('./res/icons/chart.png')
                }
              }
            }
          }
        ]
      }
    }
  });
});
