import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import Container from '../components/Container';

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
      <Container style={styles.container}>
        {this.props.render({ closeModal: this.closeModal })}
        <TouchableHighlight style={styles.close} onPress={this.closeModal}>
          <Icon name="close" color="white" />
        </TouchableHighlight>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: { margin: 32, backgroundColor: 'white', borderRadius: 3, position: 'relative' },
  close: {
    position: 'absolute',
    top: -16,
    right: -16,
    borderRadius: 100,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32
  }
});

export default Modal;
