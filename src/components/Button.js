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
    const { style, onClick } = this.props
    return (
      <button
        onClick={onClick}
        style={{ ...styles.button, opacity: this.state.hovered ? 0.5 : 1, ...style }}
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
    const { onClick } = this.props;

    return (
      <div
        style={styles.container_float_button}
        className="container-float-button"
        onClick={onClick}>
        <img
          style={styles.icon}
          src={require('../assets/imgs/icons/add.svg')} />
      </div>
    );
  }

}
