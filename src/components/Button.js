import React, { Component } from 'react';

import styles from './styles/Button';
import './styles/Button.css';

export default class Button extends Component {

  constructor() {
    super();
    this.state = {
      hovered: false,
    };
  }

  render() {
    const { onClick } = this.props
    return (
      <button
        onClick={onClick}
        style={{ ...styles.button, opacity: this.state.hovered ? 0.5 : 1 }}
        onMouseEnter={() => {
          this.setState({ hovered: true });
        }}
        onMouseLeave={() => {
          this.setState({ hovered: false });
        }}>
        <p style={styles.button_label}>{this.props.label}</p>
      </button>
    );
  }

}

export class FloatButton extends Component {

  render() {
    return (
      <div
        style={styles.container_float_button}
        className="container-float-button">
        <img
          style={styles.icon}
          src={require('../assets/imgs/icons/add.svg')} />
      </div>
    );
  }

}
