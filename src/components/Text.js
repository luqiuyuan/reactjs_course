import React from 'react';
import './styles/Text.css';

export default function Text({ type, children, className, ...rest }) {
  return <p {...rest} className={'text-base ' + type + (className? ' ' + className : '')}>{children}</p>
}
