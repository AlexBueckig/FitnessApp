import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import Modal, { IRenderPropsParams } from '../Modal';
import WorkoutAddModalContainer from './WorkoutAddModalContainer';

interface IProps {
  componentId: string;
  parentComponentId: string;
}

export default class WorkoutAddModal extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  modalContents = ({ closeModal }: IRenderPropsParams) => (
    <WorkoutAddModalContainer
      parentComponentId={this.props.parentComponentId}
      componentId={this.props.componentId}
      closeModal={closeModal}
    />
  );

  render() {
    return <Modal render={this.modalContents} />;
  }
}
