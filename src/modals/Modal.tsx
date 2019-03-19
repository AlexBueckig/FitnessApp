import React, { Component } from 'react';
import { Button, View } from 'react-native';
import { Navigation } from 'react-native-navigation';

export interface IRenderPropsParams {
  closeModal: () => void;
}

interface IProps {
  render: (props: IRenderPropsParams) => React.ReactNode;
}

class Modal extends Component<IProps> {
  closeModal = () => {
    Navigation.dismissAllModals();
  };

  render() {
    return (
      <View style={{ margin: 32, backgroundColor: 'white', borderRadius: 3, position: 'relative' }}>
        {this.props.render({ closeModal: this.closeModal })}
        <Button title={'Close'} onPress={this.closeModal} />
      </View>
    );
  }
}

export default Modal;
