import React, { Component } from 'react';
import Text from './Text';
import WhiteBlank from './WhiteBlank';
import { connect } from 'react-redux';

class Like extends Component {

  constructor(props) {
    super(props);
    this.state = {
      num: this.props.num,
      liked: this.props.liked,
    };
  }

  render() {
    const {
      num,
      liked,
    } = this.state;

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
    if (this.state.liked) {
      this.props.dislike && this.props.dislike(this.props.question_id, () => {
        this.props.getAll && this.props.getAll();
      });
      this.setState({ liked: false, num: this.state.num-1 });
    } else {
      this.props.like && this.props.like(this.props.question_id, () => {
        this.props.getAll && this.props.getAll();
      });
      this.setState({ liked: true, num: this.state.num+1 });
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

const mapDispatch = ({ questions: { getAll, like, dislike } }) => ({
  getAll: () => getAll(),
  like: (question_id, success_callback) => like({ question_id, success_callback }),
  dislike: (question_id, success_callback) => dislike({ question_id, success_callback }),
});
export default connect(null, mapDispatch)(Like);
