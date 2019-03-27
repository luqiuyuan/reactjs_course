import React, { Component } from 'react';

import { connect } from "react-redux";

import styles from './styles/Questions';
import Question from '../components/Question';
import WhiteBlank from '../components/WhiteBlank';
import Button, { FloatButton } from '../components/Button';
import TextInput from '../components/TextInput';
import validate, {
  existence,
  questionTitleLength,
  questionContentLength,
} from '../utils/validations';
import { Switch, Route } from 'react-router-dom';
import List from '../components/List';
import Answers from './Answers';


class Questions extends Component {

  state = {
    show_create_question: false,
  }

  componentDidMount() {
    if (this.props.questions.length == 0) {
      this.props.getAll();
    }
  }

  clickAdd = () => {
    this._create_question_ref && this._create_question_ref.show()
  }

  render() {
    return (
      <div style={styles.scrollable}>
        <WhiteBlank h={20} />
        <Switch>
          <Route path="/questions/:question_id" component={Answers} />
          <Route render={() => <div style={styles.question_list_container}>
            <QuestionList questions={this.props.questions} />
            <FloatButton style={styles.button_add} onClick={this.clickAdd} />
            <CreateQuestionContainer ref={this._createQuestionRef} />
          </div>} />
        </Switch>
      </div>
    );
  }

  _createQuestionRef = (ref) => {
    this._create_question_ref = ref;
  }

}

const mapState = state => ({
  questions: state.questions,
});
const mapDispatch = ({ questions: { getAll } }) => ({
  getAll: () => getAll(),
});
export default connect(mapState, mapDispatch)(Questions);

// 组件QuestionList只用在这一个页面，所以我们就不export了
function QuestionList({ questions }) {
  return <List
    data={questions}
    keyExtractor={item => item.id}
    renderRow={(question) =>
      <Question
        className="hover-opacity"
        id={question.id}
        numOfLikes={question.number_of_likes}
        key={"question_" + question.id}
        title={question.title}
        content={question.content}
        style={styles.question} />}
      />

}



class CreateQuestion extends Component {

  static VALIDATIONS = {
    title: [existence, questionTitleLength],
    content: [questionContentLength],
  }

  state = {
    should_show: false,
    title_err: '',
    content_err: '',
  }

  constructor(props) {
    super(props)
    this.input_values = {};
  }

  render() {
    if (this.state.should_show) {
      return (
        <div
          style={styles.container_create_question}
          onClick={() => this.hide()}>
          <div
            style={styles.panel_create_question}
            onClick={(event) => {
              event.stopPropagation();
            }}>
            <TextInput id="title" style={styles.title_create_question} errMsg={this.state['title_err']} onBlur={this.onBlur} onChange={this.onChange} placeholder="Title" />
            <WhiteBlank w={8} />
            <TextInput id="content" style={styles.content_create_question} errMsg={this.state['content_err']} onBlur={this.onBlur} onChange={this.onChange} placeholder="Content" />
            <div style={styles.blank} />
            <Button label="Ask" style={styles.button_create_question} onClick={this.onSubmit} />
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  onSubmit = () => {
    // validate each input, get error message
    let _errMsgs = {}
    Object.keys(CreateQuestion.VALIDATIONS).forEach((id) => {
      if (CreateQuestion.VALIDATIONS[id]) {
        _errMsgs[id + '_err'] = validate(CreateQuestion.VALIDATIONS[id], this.input_values[id])
      }
    })

    // only try to setState when there are validation errors
    if (this._checkErr(_errMsgs)) {
      this.setState(_errMsgs)
    } else {
      this.props.create && this.props.create(this.input_values['title'], this.input_values['content'], () => {
        this.props.getAll && this.props.getAll();
        this.hide();
      });
    }
  }

  // trigger when user typing words
  onChange = ({ target: { id, value } }) => {
    this.input_values[id] = value;
    // Reset the error message when user typing
    if (this.state[id + '_err']) {
      this.setState({ [id + '_err']: '' })
    }
  }

  // check the input existence on input blur
  onBlur = ({ target: { id, value } }) => {
    const first_validation = CreateQuestion.VALIDATIONS[id][0];
    if (first_validation.name === 'required') {
      this.setState({
        [id + '_err']: validate(first_validation, value)
      });
    }
  }

  show = () => {
    this.setState({ should_show: true });
  }
  hide = () => {
    this.setState({ should_show: false });
  }

  // check if there is a error message
  _checkErr = obj => {
    // traverse the obj, if there is any valid error message, return true
    for (let val in obj) {
      if (obj[val]) return true
    }
    return false
  }

}

const mapDispatchCreateQuestion = ({ questions: { getAll, create } }) => ({
  getAll: () => getAll(),
  create: (title, content, success_callback) => create({ title, content, success_callback }),
});
const CreateQuestionContainer = connect(null, mapDispatchCreateQuestion, null, { forwardRef: true })(CreateQuestion);
