import React, { Component } from 'react';
import Text from '../components/Text';
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

export class ButtonSmallPositive extends Component {

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
        style={{ ...styles.button_small_positive, opacity: this.state.hovered ? 0.5 : 1, ...style }}
        onMouseEnter={() => {
          this.setState({ hovered: true });
        }}
        onMouseLeave={() => {
          this.setState({ hovered: false });
        }}>
        <Text type="white">{this.props.label}</Text>
      </button>
    );
  }

}

export class ButtonSmallNegative extends Component {

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
        style={{ ...styles.button_small_negative, opacity: this.state.hovered ? 0.5 : 1, ...style }}
        onMouseEnter={() => {
          this.setState({ hovered: true });
        }}
        onMouseLeave={() => {
          this.setState({ hovered: false });
        }}>
        <Text >{this.props.label}</Text>
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

export class EditButton extends Component {

  render() {
    const { style } = this.props;

    return (
      <div
        style={{...styles.container_edit_button, ...style}}
        onClick={this.props.onClick}>
        <img
          style={styles.icon_edit}
          src={require('../assets/imgs/icons/pencil-edit-button.svg')} />
        <Text type="red" style={styles.label_edit}>Edit</Text>
      </div>
    );
  }

}
