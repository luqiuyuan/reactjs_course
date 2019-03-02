import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
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

  // init error messages for each input
  state = {
    email_err: '',
    password_err: '',
    name_err: ''
  }

  // init an object to save input values
  input_values = {
    email: '',
    password: '',
    name: ''
  }

  // trigger when user click login button
  onSubmit = () => {
    // validate each input, get error message
    const email_err = this._validate('email');
    const password_err = this._validate('password');
    const name_err = this._validate('name');

    // only try to setState when there are validation errors
    if (email_err || password_err || name_err) {
      this.setState({
        email_err,
        password_err,
        name_err
      })
    } else {
      console.log('submit form data', this.input_values)
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

  // clear input and its error message when switch page
  clearInput = () => {
    this.setState({
      email_err: '',
      password_err: '',
      name_err: ''
    })
  }

  render() {
    const {
      email_err,
      password_err,
      name_err
    } = this.state

    const {
      location
    } = this.props;

    return (
      <div style={styles.container}>

        <div style={styles.panel}>

          <Text type="xl RussoOne" style={styles.header}>BIG FISH</Text>

          <TextInput id="email" errMsg={email_err} onBlur={this.onBlur} onChange={this.onChange} placeholder="Email" />
          <WhiteBlank h={8} />
          <TextInput id="password" errMsg={password_err} onBlur={this.onBlur} onChange={this.onChange} placeholder="Password" />

          <Route path="/signup" render={() => <>
            <WhiteBlank h={8} />
            <TextInput id="name" errMsg={name_err} onBlur={this.onBlur} onChange={this.onChange} placeholder="Name" />
          </>} />

          <WhiteBlank h={73} />

          <Button label={location.pathname === '/signup' ? 'Signup' : 'Login'} onClick={this.onSubmit} />

          <div style={styles.placeholder} />

          <div style={styles.footer}>
            <Route path="/signup" render={() => <>
              <Text>Already have an account?</Text>
              <Link onClick={this.clearInput} to="/login"><Text style={styles.footer_link}>Login</Text></Link>
            </>} />
            <Route exact path={['/login', '/']} render={() => <>
              <Text>Don’t have an account?</Text>
              <Link onClick={this.clearInput} to="/signup"><Text style={styles.footer_link}>Signup</Text></Link>
            </>} />
          </div>

        </div>

      </div>
    );
  }

  // validate function will return the error message when validation fails
  // otherwise, will return undefined
  _validate = id => validate(VALIDATION_CONFIG[id], this.input_values[id])

}

export default SignInSignUp;
