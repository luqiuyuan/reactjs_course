import React from 'react';

export default function WhiteBlank({ w, h }) {
  return <div style={{ width: w, height: h, flexShrink: 0 }} />
}

WhiteBlank.defaultProps = {
  h: 0,
  w: 0
}
