import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import Modal, { IRenderPropsParams } from '../Modal';
import DayAddModalContainer from './DayAddModalContainer';

interface IProps {
  componentId: string;
  parentComponentId: string;
  id: string;
}

export default class DayAddModal extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  modalContents = ({ closeModal }: IRenderPropsParams) => (
    <DayAddModalContainer id={this.props.id} parentComponentId={this.props.parentComponentId} closeModal={closeModal} />
  );

  render() {
    return <Modal render={this.modalContents} />;
  }
}
