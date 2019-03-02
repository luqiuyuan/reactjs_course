import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignInSignUp from './SignInSignUp';
import Questions from './Questions';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/questions" component={Questions}/>
          <Route path={['/', '/signin', '/login']} component={SignInSignUp}/>
        </Switch>
      </BrowserRouter>
    );
  }

}

export default App;
