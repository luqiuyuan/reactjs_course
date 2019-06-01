import React, { Component } from 'react';

import Text from './Text';
import styles from './styles/Question';
import WhiteBlank from './WhiteBlank';
import { NavLink } from 'react-router-dom';
import Like from './Like';

export default class Question extends Component {

  render() {
    const {
      title,
      content,
      style,
      className,
      id,
      numOfLikes,
      liked
    } = this.props;

    return (
      <div
        className={className}
        style={{ ...styles.container, ...style }}
        onClick={this.onClick}>
        <Text type='Roboto-Medium'>{title}</Text>
        <WhiteBlank h={8} />
        <Text style={styles.content}>{content}</Text>
        <WhiteBlank h={8} />
        {numOfLikes !== undefined && <Like question_id={id} num={numOfLikes} liked={liked} />}
      </div>
    );
  }
}

Question.defaultProps = {
  title: "",
  content: "",
}
