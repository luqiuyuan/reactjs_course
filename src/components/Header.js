import React from 'react';

import styles from './styles/Header';
import Text from '../components/Text';
import { withRouter } from 'react-router-dom';
import './styles/Header.css';

function Header(props) {
  return (
    <div style={styles.container}>
      <Text
        type='l RussoOne'
        className="logo"
        style={styles.logo}
        onClick={() => props.history.push('/')}>
        BIG FISH
      </Text>
      <img
        style={styles.avatar}
        src={props.avatarSrc}
        alt="avatar" />
    </div>
  );
}

export default withRouter(Header);
