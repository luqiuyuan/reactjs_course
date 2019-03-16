import React, { Component } from 'react';

import axios from 'axios';

import { SERVER_ADDRESS } from '../constants';
import Header from '../components/Header';
import styles from './styles/Questions';
import Question from '../components/Question';
import Seperator from '../components/Seperator';
import WhiteBlank from '../components/WhiteBlank';
import { FloatButton } from '../components/Button';

export default class Questions extends Component {

  state = {
    questions: null,
  }

  componentDidMount() {
    // axios是网页端常用的网络访问组件，符合REST风格。这个组件的使用非常灵活，下面这句还可以写成
    // const request = axios.get(SERVER_ADDRESS + '/questions');
    // 更多axios的用法，可以参考它的文档：https://github.com/axios/axios
    const request = axios({
      method: 'get',
      url: SERVER_ADDRESS + '/questions',
    })

    request.then((response) => {
      this.setState({ questions: response.data.questions });
    });
  }

  render() {
    return (
      <div style={styles.container}>
        <Header avatarSrc={require('../assets/imgs/avatar_default.jpg')} />
        <div style={styles.scrollable}>
          <WhiteBlank h={20} />
          {this.state.questions
            // 这里question列表的显示逻辑比较复杂，因此我们把questions列表分出来写成一个组件，从而使主组件更简洁。
            ? <QuestionList questions={this.state.questions} />
            : null
          }
        </div>
        <FloatButton style={styles.button_add} />
      </div>
    );
  }

}

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
