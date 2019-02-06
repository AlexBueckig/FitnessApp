import React, { PureComponent } from 'react';

interface IProps {
  onDismiss: (id: number) => void;
  id: number;
  message: string;
}

class Toast extends PureComponent<IProps> {
  public render() {
    return (
      <li>
        <p>{this.props.message}</p>
        <button onClick={this.onClick}>X</button>
      </li>
    );
  }

  public shouldComponentUpdate = () => {
    return false;
  };

  private onClick = () => {
    this.props.onDismiss(this.props.id);
  };
}

export default Toast;
