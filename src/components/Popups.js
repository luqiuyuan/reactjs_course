import React from 'react';
import Icon from './Icon';
import Text from './Text';

import './styles/Popup.css';
const default_config = {
  is_show: false,
  message: "",
};

export default class Modal extends React.Component {
  state = default_config;

  /**
   * @public open a popup with config
   * @param {object} configs the configs of popup
   * @param {string} configs.message the text content of the popup
   */
  open = configs => this.setState({ is_show: true, ...configs });

  /**
   * @public close a popup and reset the config
   *
   */
  close = () => this.state.is_show && this.setState(default_config);

  render() {
    const { is_show, type, message } = this.state;
    let box = null
    switch (type) {
      case 'warn':
        box = <Warn onClose={this.close} message={message} />
        break;
      default:
        box = <Warn onClose={this.close} message={message} />
    }

    return is_show ? (
      <div className={"popup-overlay " + type}>
        {box}
      </div>
    ) : null;
  }

}



// each popup should implement following props
// 1. message --> the text content should show in the popup
// 2. onClose --> the callback when the popup attempt to close
export const Warn = ({ message, onClose }) =>
  <div className="msg-box">
    <Text type="black">{message}</Text>
    <Icon className="icon" type="cancel" onClick={onClose} />
  </div>