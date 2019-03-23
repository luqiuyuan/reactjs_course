import React from 'react';
import Text from './Text';
import WhiteBlank from './WhiteBlank';

const Like = ({ num, liked }) => {
  const text_style = liked ? 's white' : 's red'
  return <div className="hover-scale" style={styles.container}>
    <Text type={text_style}>▲</Text>
    <WhiteBlank w={11} />
    <Text type={text_style}>Agree {num}</Text>
  </div>
}


const styles = {
  container: {
    backgroundColor: '#F4BDB0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 109,
    height: 30,
    borderRadius: 5
  }
}

export default Like;