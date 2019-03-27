import React from 'react';

import Text from './Text';
import styles from './styles/Question';
import WhiteBlank from './WhiteBlank';
import { NavLink } from 'react-router-dom';
import Like from './Like';

export default function Question(props) {
  const {
    title,
    content,
    style,
    className,
    id,
    numOfLikes
  } = props;

  return (
    <NavLink to={`/questions/${id}`} className={className} style={{ ...styles.container, ...style }}>
      <Text type='Roboto-Medium' >{title}</Text>
      <WhiteBlank h={8} />
      <Text>{content}</Text>
      <WhiteBlank h={8} />
      {numOfLikes !== undefined && <Like num={numOfLikes}/>}
    </NavLink>
  );
}

Question.defaultProps = {
  title: "",
  content: "",
}
