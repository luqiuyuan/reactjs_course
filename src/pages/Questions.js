import React, { Component } from 'react';

import Header from '../components/Header';
import styles from './styles/Questions';
import Question from '../components/Question';
import Seperator from '../components/Seperator';
import WhiteBlank from '../components/WhiteBlank';
import { connect } from 'react-redux';
import { FloatButton } from '../components/Button';

class Questions extends Component {

  componentDidMount() {
    if (this.props.questions.length == 0) {
      this.props.getAllQuestions();
    }
  }

  render() {
    return (
      <div style={styles.container}>
        <Header avatarSrc={require('../assets/imgs/avatar_default.jpg')} />
        <div style={styles.scrollable}>
          <WhiteBlank h={20} />
          {this.props.questions
            // 这里question列表的显示逻辑比较复杂，因此我们把questions列表分出来写成一个组件，从而使主组件更简洁。
            ? <QuestionList questions={this.props.questions} />
            : null
          }
        </div>
        <FloatButton />
      </div>
    );
  }

}

let mapState = state => ({
  questions: state.questions,
});
let mapDispatch = (dispatch) => ({
  getAllQuestions: () => dispatch.questions.getAll(),
});
export default connect(mapState, mapDispatch)(Questions);

// 组件QuestionList只用在这一个页面，所以我们就不export了
function QuestionList(props) {
  if (props.questions) {
    // 这一段逻辑是在question中间插入分隔线，但最后一个question后面没有分隔线
    let arr_question = props.questions.map((question) => {
      return (
        <Question
          key={"question_" + question.id}
          title={question.title}
          content={question.content}
          style={styles.question} />
      );
    });
    let arr_mixed = [];
    for (let i = 0; i < arr_question.length - 1; i++) {
      arr_mixed.push(arr_question[i]);
      arr_mixed.push(<Seperator key={"seperator_" + i} />);
    }
    arr_mixed.push(arr_question[arr_question.length - 1]);

    return (
      <div style={styles.question_list_container}>
        {arr_mixed}
      </div>
    );
  } else {
    return null;
  }
}
