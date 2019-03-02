import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignInSignUp from './SignInSignUp';
import Questions from './Questions';

class App extends Component {
  render() {
    return (
      <Questions />
    );
  }

}

export default App;
