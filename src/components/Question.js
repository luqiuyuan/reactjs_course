import React, { Component } from 'react';

import Text from './Text';
import styles from './styles/Question';
import WhiteBlank from './WhiteBlank';

export default function Question(props) {
  const {
    title,
    content,
    style,
  } = props;

  return (
    <div style={{ ...styles.container, ...style }}>
      <Text type='Roboto-Medium' >{title}</Text>
      <WhiteBlank h={8} />
      <Text>{content}</Text>
    </div>
  );
}

Question.defaultProps = {
  title: "",
  content: "",
}
