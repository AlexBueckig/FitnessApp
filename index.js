/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'es6-symbol/implement';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/containers';

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
                    passProps: {
                      text: 'This is tab 1'
                    },
                    options: {
                      topBar: {
                        title: {
                          text: 'Feed'
                        }
                      }
                    }
                  }
                }
              ],
              options: {
                bottomTab: {
                  text: 'Feed',
                  icon: require('./res/images/one.png')
                }
              }
            }
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'WorkoutMenuScreen',
                    passProps: {
                      text: 'This is tab 2'
                    }
                  }
                }
              ],
              options: {
                bottomTab: {
                  text: 'Workout',
                  icon: require('./res/images/one.png')
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
                  text: 'Erfolge',
                  icon: require('./res/images/one.png')
                }
              }
            }
          }
        ]
      }
    }
  });
});
