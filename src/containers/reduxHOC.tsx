import React, { Component } from 'react';
import { Provider } from 'react-redux';
import IStoreState from '../types';

// @ts-ignore
export default function reduxHOC(Scene, store: Store<IStoreState>) {
  return class extends Component {
    public static options = {
      ...Scene.options
    };

    public componentDidMount() {
      // @ts-ignore
      this.instance = this.refs.child.getWrappedInstance();
    }

    public resendEvent = (eventName: string, params: string) => {
      // @ts-ignore
      if (this.instance && this.instance[eventName]) {
        // @ts-ignore
        this.instance[eventName](params);
      }
    };

    public componentDidAppear() {
      // @ts-ignore
      this.resendEvent('componentDidAppear');
    }

    public componentDidDisappear() {
      // @ts-ignore
      this.resendEvent('componentDidDisappear');
    }

    public onNavigationButtonPressed(buttonId: string) {
      this.resendEvent('onNavigationButtonPressed', buttonId);
    }

    public render() {
      return (
        <Provider store={store}>
          <Scene ref="child" {...this.props} />
        </Provider>
      );
    }
  };
}
