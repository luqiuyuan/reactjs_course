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
    let { style, onClick } = this.props;

    return (
      <div
        className="container-float-button"
        style={{...styles.container_float_button, ...style}}
        onClick={onClick}>
        <img
          style={styles.icon_float_button}
          src={require('../assets/imgs/icons/add.svg')} />
      </div>
    );
  }

}
