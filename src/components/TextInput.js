import React, { Component } from 'react';

import styles from './styles/TextInput';
import Text from './Text';

export default class TextInput extends Component {
  render() {
    const { style, errMsg, ...rest } = this.props;

    return (
      <div style={{ ...styles.container, style }}>
        <div>
          <input {...rest} style={styles.input} />
          <div style={styles.line(errMsg)} />
        </div>
        <Text type="xs err">{errMsg}</Text>
      </div>
    );
  }

}
