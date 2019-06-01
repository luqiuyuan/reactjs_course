import React from 'react';

import styles from './styles/Header';
import Text from '../components/Text';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Avatar from '../components/Avatar';
import UserFetcher from '../components/UserFetcher';
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
      <UserFetcher
        id={props.userToken.user_id}>
        {(user) => (
          <Avatar
            style={styles.avatar}
            src={user.avatar_url}
            userID={user.id}
            size={48} />
        )}
      </UserFetcher>
    </div>
  );
}

const mapState = state => ({
  userToken: state.user_token,
});
export default connect(mapState, null)(withRouter(Header));
