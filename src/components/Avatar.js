import React, { Component } from 'react';
import defaultAvatar from '../assets/imgs/avatar_default.jpg';
import { Redirect } from 'react-router-dom';

export default class Avatar extends Component {

  state = {
    redirect_to_user: false,
  }

  render() {
    if (this.state.redirect_to_user) {
      return <Redirect to={{ pathname: `/users/${this.props.userID}` }} />
    } else {
      return (
        <img
          alt={'avatar'}
          style={{...styles.avatar(this.props.size), ...this.props.style}}
          src={this.props.src || defaultAvatar}
          onClick={() => {
            if (this.props.userID) {
              this.setState({redirect_to_user: true});
            }
          }} />
      );
    }
  }

}

Avatar.defaultProps = {
  src: defaultAvatar,
}

const styles = {
  avatar: size => ({
    width: size,
    height: size,
    borderRadius: '50%',
    cursor: 'pointer',
  })
}
