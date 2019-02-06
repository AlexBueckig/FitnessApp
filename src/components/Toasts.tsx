import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { IToast } from '../types/toastTypes';
import Toast from './Toast';

interface IProps {
  toasts: IToast[];
  removeToast: (id: number) => void;
}

class Toasts extends PureComponent<IProps> {
  public render() {
    const { toasts } = this.props;
    return (
      <View>
        {toasts.map(toast => {
          return <Toast key={JSON.stringify(toast)} onDismiss={this.dismissToast} {...toast} />;
        })}
      </View>
    );
  }

  private dismissToast = (id: number) => {
    this.props.removeToast(id);
  };
}

export default Toasts;
