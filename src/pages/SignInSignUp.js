import React, { Component, Fragment } from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
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
import Popup from '../modules/Popup'
import { SERVER_ADDRESS } from '../constants';


const VALIDATION_CONFIG = {
  email: [existence, emailFormat],
  password: [existence, passwordLength, uppercase, lowercase],
  name: [nameLength],
  login: [existence],
}

class SignInSignUp extends Component {

  render() {
    return (
      <div style={styles.container}>

        <div style={styles.panel}>

          <Text type="xl RussoOne" style={styles.header}>BIG FISH</Text>
          <Switch>
            <Route path="/signup" render={() => <SignUpForm />} />
            <Route path="/" render={() => <LoginForm onLogin={this.props.onLogin} />} />
          </Switch>
        </div>

      </div>
    );
  }



}

export default SignInSignUp;

class SignUpForm extends Component {

  state = {
    redirect_to_login: false,
  }

  render() {
    if (this.state.redirect_to_login) return <Redirect to={{pathname: "/login"}} />

    return <BaseForm
      inputs={[
        { id: 'email', placeholder: 'Email', validations: VALIDATION_CONFIG.email },
        { id: 'password', placeholder: 'Password', validations: VALIDATION_CONFIG.password, type: 'password' },
        { id: 'name', placeholder: 'Name', validations: VALIDATION_CONFIG.name }
      ]}
      btnLabel="Signup"
      footerText="Already have an account?"
      link={{ displayName: 'Login', path: '/login' }}
      onSubmit={this.onSubmit}
    />
  }

  onSubmit = (input_values) => {
    let request = axios({
      method: 'post',
      url: SERVER_ADDRESS + '/users',
      data: {
        user: {
          email: input_values['email'],
          password: input_values['password'],
          name: input_values['name'],
        }
      },
      validateStatus: function (status) {
        return (status >= 200 && status < 300) || (status >= 400 && status < 500);
      },
    });

    request.then((response) => {
      if (response.status == 201) {
        Popup.warn("Congradulations! Your registration was successful!");
        this.setState({ redirect_to_login: true })
      } else if (response.status == 400) {
        let first_error = response.data.errors[0];
        if (first_error.code == 'duplicated_field') {
          Popup.warn("This email has already been registered.");
        } else {
          Popup.warn("Something expected happened T_T Please contact admin@bigfish.ca. (error code is " + first_error.code + ")");
        }
      } else {
        Popup.warn("Something expected happened T_T Please contact admin@bigfish.ca. (status is " + response.status + ")");
      }
    })
    .catch((error) => {
      Popup.warn("Something expected happened T_T Please contact admin@bigfish.ca. (error is " + error + ")");
    });
  }

}

class LoginForm extends Component {

  state = {
    redirect_to_questions: false,
  }

  render() {
    if (this.state.redirect_to_questions) return <Redirect to={{pathname: '/questions'}} />

    return <BaseForm
      inputs={[
        { id: 'email', placeholder: 'Email', validations: VALIDATION_CONFIG.login },
        { id: 'password', placeholder: 'Password', validations: VALIDATION_CONFIG.login, type: 'password' },
      ]}
      btnLabel="Login"
      footerText="Don't have an account?"
      link={{ displayName: 'Signup', path: '/signup' }}
      onSubmit={this.onSubmit}
    />
  }

  onSubmit = (input_values) => {
    let request = axios({
      method: 'post',
      url: SERVER_ADDRESS + '/user_tokens',
      data: {
        credential: {
          email: input_values['email'],
          password: input_values['password'],
        }
      },
      validateStatus: function (status) {
        return (status >= 200 && status < 300) || (status >= 400 && status < 500);
      },
    });

    request.then((response) => {
      if (response.status == 201) {
        let {
          user_id,
          key,
          expire_in,
        } = response.data.user_token;
        this.props.onLogin && this.props.onLogin({ user_id, key, expire_in });

        this.setState({ redirect_to_questions: true });
      } else if (response.status == 400) {
        let first_error = response.data.errors[0];
        if (first_error.code == 'invalid_credential') {
          Popup.warn("Email or password is incorrect! Please try again");
        } else {
          Popup.warn("Something expected happened T_T Please contact admin@bigfish.ca. (error code is " + first_error.code + ")");
        }
      } else {
        Popup.warn("Something expected happened T_T Please contact admin@bigfish.ca. (status is " + response.status + ")");
      }
    })
    .catch((error) => {
      Popup.warn("Something expected happened T_T Please contact admin@bigfish.ca. (error is " + error + ")");
    });
  }
  
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
    let _state = {}
    this.input_values = {}
    props.inputs.forEach(input => {
      _state[input.id + '_err'] = ''
      this.input_values[input.id] = ''
    })
    this.state = _state
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
