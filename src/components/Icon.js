import React from 'react';

import add from '../assets/imgs/icons/add.svg';
import cancel from '../assets/imgs/icons/cancel.svg';
import logout from '../assets/imgs/icons/logout.svg';
import pencil from '../assets/imgs/icons/pencil-edit-button.svg';
import camera from '../assets/imgs/icons/photo-camera.svg';

const ICONS = {
  add,
  cancel,
  logout,
  pencil,
  camera
}
export default function Icon({ type, ...rest }) {
  return <img alt={'icon ' + type} src={ICONS[type]} {...rest} />
}