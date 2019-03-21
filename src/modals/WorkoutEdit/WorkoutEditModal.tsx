import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import Modal, { IRenderPropsParams } from '../Modal';
import WorkoutEditModalContainer from './WorkoutEditModalContainer';

interface IProps {
  componentId: string;
  parentComponentId: string;
  id: string;
}

export default class WorkoutEditModal extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  modalContents = ({ closeModal }: IRenderPropsParams) => (
    <WorkoutEditModalContainer
      id={this.props.id}
      parentComponentId={this.props.parentComponentId}
      componentId={this.props.componentId}
      closeModal={closeModal}
    />
  );

  render() {
    return <Modal render={this.modalContents} />;
  }
}
