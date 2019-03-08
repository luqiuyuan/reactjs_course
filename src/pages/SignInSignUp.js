import React, { Component, Fragment } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import styles from './styles/App';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import WhiteBlank from '../components/WhiteBlank';
import Text from '../components/Text';
import validate, {
  existence,
  emailFormat,
  passwordLength,
  uppercase,
  lowercase,
  nameLength
} from '../utils/validations';

const VALIDATION_CONFIG = {
  email: [existence, emailFormat],
  password: [existence, passwordLength, uppercase, lowercase],
  name: [nameLength]
}

class SignInSignUp extends Component {

  signup = (input_values) => {
    console.log(input_values)
  }

  login = (input_values) => {
    console.log(input_values)
  }

  render() {
    return (
      <div style={styles.container}>

        <div style={styles.panel}>

          <Text type="xl RussoOne" style={styles.header}>BIG FISH</Text>
          <Switch>
            <Route path="/signup" render={() => <SignUpForm onSubmit={this.signup} />} />
            <Route path="/" render={() => <LoginForm onSubmit={this.login} />} />
          </Switch>
        </div>

      </div>
    );
  }



}

export default SignInSignUp;

function SignUpForm({ onSubmit }) {
  return <BaseForm
    inputs={[
      { id: 'email', placeholder: 'Email', validations: VALIDATION_CONFIG.email },
      { id: 'password', placeholder: 'Password', validations: VALIDATION_CONFIG.password, type: 'password' },
      { id: 'name', placeholder: 'Name', validations: VALIDATION_CONFIG.name }
    ]}
    btnLabel="Signup"
    footerText="Already have an account?"
    link={{ displayName: 'Login', path: '/login' }}
    onSubmit={onSubmit}
  />
}

function LoginForm({ onSubmit }) {
  return <BaseForm
    inputs={[
      { id: 'email', placeholder: 'Email', validations: VALIDATION_CONFIG.email },
      { id: 'password', placeholder: 'Password', validations: VALIDATION_CONFIG.password, type: 'password' },
    ]}
    btnLabel="Login"
    footerText="Don't have an account?"
    link={{ displayName: 'Signup', path: '/signup' }}
    onSubmit={onSubmit}
  />
}


// 一个可行的解决方案，
// 主要的思想是：进一步抽象组件，把表单验证、提交提炼为一个较为通用的组件

class BaseForm extends Component {
  static defaultProps = {
    inputs: [],
    btnLabel: 'Confirm',
    footerText: 'default footer text',
    footerLink: { path: '/login', displayName: 'Login' },
    onSubmit: () => { }
  }

  constructor(props) {
    super(props)
    // init state to save error msgs
    this.state = {}
    this.input_values = {}
    props.inputs.forEach(input => {
      this.state[input.id + '_err'] = ''
      this.input_values[input.id] = ''
    })
  }

  onSubmit = () => {
    // validate each input, get error message
    let _errMsgs = {}
    this.props.inputs.forEach(({ validations, id }) => {
      if (validations) {
        _errMsgs[id + '_err'] = validate(validations, this.input_values[id])
      }
    })

    // only try to setState when there are validation errors
    if (this._checkErr(_errMsgs)) {
      this.setState(_errMsgs)
    } else {
      this.props.onSubmit(this.input_values)
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
    const first_validation = VALIDATION_CONFIG[id][0]
    if (first_validation.name === 'required') {
      this.setState({
        [id + '_err']: validate(first_validation, value)
      })
    }
  }

  render() {
    const {
      inputs,
      footerText,
      link: {
        path,
        displayName
      },
      btnLabel
    } = this.props
    return (
      <>
        {inputs.map(({ id, validations, ...rest }, index) => <Fragment key={id}>
          <TextInput id={id} errMsg={this.state[id + '_err']} onBlur={this.onBlur} onChange={this.onChange} {...rest} />
          {index !== inputs.length - 1 && <WhiteBlank h={8} />}
        </Fragment>)}

        <WhiteBlank h={73} />

        <Button label={btnLabel} onClick={this.onSubmit} />

        <div style={styles.placeholder} />

        <div style={styles.footer}>
          <Text>{footerText}</Text>
          <Link to={path}><Text style={styles.footer_link}>{displayName}</Text></Link>
        </div>
      </>

    )
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
