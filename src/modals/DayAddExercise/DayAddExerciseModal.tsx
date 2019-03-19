import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import Modal, { IRenderPropsParams } from '../Modal';
import DayAddExerciseModalContainer from './DayAddExerciseModalContainer';

interface IProps {
  componentId: string;
  parentComponentId: string;
  id: string;
}

export default class DayAddExerciseModal extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  modalContents = ({ closeModal }: IRenderPropsParams) => (
    <DayAddExerciseModalContainer id={this.props.id} closeModal={closeModal} />
  );

  render() {
    return <Modal render={this.modalContents} />;
  }
}
