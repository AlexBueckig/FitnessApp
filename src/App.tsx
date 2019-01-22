import React, { PureComponent } from 'react';
import { Navigation } from 'react-native-navigation';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import realm from './api/realm/schemas';
import { registerScreens } from './containers';
import rootReducer from './redux/reducers';
import mySaga from './redux/sagas';

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(mySaga);

registerScreens(store);

interface IProps {}

class App extends PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);
    this.startApp();
  }

  public componentWillUnmount = () => {
    realm.close();
  };

  public startApp() {
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
                    icon: require('../res/images/one.png')
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
                    icon: require('../res/images/one.png')
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
                    icon: require('../res/images/one.png')
                  }
                }
              }
            }
          ]
        }
      }
    });
  }
}

export default App;
