import React from 'react';

import Text from './Text';
import styles from './styles/Question';
import WhiteBlank from './WhiteBlank';
import Avatar from './Avatar';
import Like from './Like';
import UserFetcher from './UserFetcher';

export default function Answer(props) {
  const {
    content,
    style,
    className,
    createAt,
    numOfLikes,
    userID
  } = props;

  return (
    <div className={className} style={{ ...styles.container, ...style }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
        <UserFetcher id={userID}>
          {
            (user) =>
              <>
                <Avatar size={63} src={user.avatar_url}/>
                <WhiteBlank w={15} />
                <div style={{ flex: 1 }}>
                  <Text>{user.name}</Text>
                  <WhiteBlank h={5} />
                  <Text type="light">{createAt.slice(0, 10)}</Text>
                </div>
              </>
          }
        </UserFetcher>

      </div>
      <WhiteBlank h={5} />
      <Text>{content}</Text>
      <WhiteBlank h={8} />
      <Like num={numOfLikes} />
    </div>
  );
}

Answer.defaultProps = {
  content: "",
}
