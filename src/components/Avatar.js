import React from 'react';
import defaultAvatar from '../assets/imgs/avatar_default.jpg';
import { Link, Route, Switch, Redirect } from 'react-router-dom';

export default class Avatar extends Component {

  render() {
    return (
      <img
        alt={'avatar'}
        style={styles.avatar(this.props.size)}
        src={this.props.src || defaultAvatar}
        onClick={} />
    )
  }

}

Avatar.defaultProps = {
  src: defaultAvatar
}

const styles = {
  avatar: size => ({
    width: size,
    height: size,
    borderRadius: '50%'
  })
}