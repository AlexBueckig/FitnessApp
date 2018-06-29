import React from 'react';
import { Navigation } from 'react-native-navigation';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers/index';
import mySaga from './sagas/index';
import { registerScreens } from './screens/index';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga);

registerScreens();

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
                          visible: false,
                          drawBehind: true
                        }
                      }
                    }
                  }
                ],
                options: {
                  bottomTab: {
                    title: 'Feed',
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
                      name: 'FeedScreen',
                      passProps: {
                        text: 'This is tab 2'
                      }
                    }
                  }
                ],
                options: {
                  bottomTab: {
                    title: 'Tab1',
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
