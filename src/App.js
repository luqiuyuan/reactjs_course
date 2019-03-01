import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignInSignUp from './pages/SignInSignUp';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/question" component={null}/>
          <Route path={['/', '/signin', '/login']} component={SignInSignUp}/>
        </Switch>
      </BrowserRouter>
    );
  }

}

export default App;
