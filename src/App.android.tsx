import React from 'react';
import { Navigation } from 'react-native-navigation';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { registerScreens } from './containers/';
import rootReducer from './reducers/';
import mySaga from './sagas/';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga);

registerScreens(store);

interface IProps {}

class App extends React.PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);
    this.startApp();
  }

  public startApp() {
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
                          },
                          visible: true,
                          drawBehind: true,
                          hideOnScroll: true
                        }
                      }
                    }
                  }
                ],
                options: {
                  bottomTab: {
                    text: 'Feed',
                    icon: require('../res/images/one.png'),
                    iconColor: 'red',
                    selectedIconColor: 'blue'
                  }
                }
              }
            },
            {
              stack: {
                children: [
                  {
                    component: {
                      name: 'CalendarScreen',
                      passProps: {
                        text: 'This is tab 2'
                      }
                    }
                  }
                ],
                options: {
                  bottomTab: {
                    text: 'Kalendar',
                    icon: require('../res/images/one.png'),
                    iconColor: 'red',
                    selectedIconColor: 'blue'
                  }
                }
              }
            },
            {
              stack: {
                children: [
                  {
                    component: {
                      name: 'WorkoutScreen',
                      passProps: {
                        text: 'This is tab 2'
                      }
                    }
                  }
                ],
                options: {
                  bottomTab: {
                    text: 'Workout',
                    icon: require('../res/images/one.png'),
                    iconColor: 'red',
                    selectedIconColor: 'blue'
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
                    icon: require('../res/images/one.png'),
                    iconColor: 'red',
                    selectedIconColor: 'blue'
                  }
                }
              }
            }
          ],
          options: {
            bottomTabs: {
              titleDisplayMode: 'alwaysShow'
            }
          }
        }
      }
    });
  }
}

export default App;
