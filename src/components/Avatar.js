import React from 'react';
import defaultAvatar from '../assets/imgs/avatar_default.jpg'

export default function Avatar({size, src}){
  return <img alt={'avatar'} style={styles.avatar(size)} src={src || defaultAvatar}/>
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