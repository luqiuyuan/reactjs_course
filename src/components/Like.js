import React, { Component } from 'react';
import Text from './Text';
import WhiteBlank from './WhiteBlank';
import { connect } from 'react-redux';

class Like extends Component {

  render() {
    const {
      num,
      liked,
    } = this.props;

    const text_style = liked ? 's white' : 's red'

    return (
      <div
        className="hover-scale"
        style={styles.container}
        onClick={this.onClick}>
        <Text type={text_style}>▲</Text>
        <WhiteBlank w={11} />
        <Text type={text_style}>Agree {num}</Text>
      </div>
    );
  }

  onClick = () => {
    if (this.props.liked) {
      this.props.dislike && this.props.dislike(this.props.question_id);
    } else {
      this.props.like && this.props.like(this.props.question_id);
    }
  }

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

const mapDispatch = ({ questions: { like, dislike } }) => ({
  like: (question_id) => like(question_id),
  dislike: (question_id) => dislike(question_id),
});
export default connect(null, mapDispatch)(Like);
