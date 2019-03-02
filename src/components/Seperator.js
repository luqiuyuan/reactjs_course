import React, { Component } from 'react';

import styles from './styles/Seperator';

export default function Seperator(props) {

  return <div style={{ ...styles.container, ...styles.line, ...styles.margin }} />

}
