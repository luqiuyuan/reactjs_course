import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignInSignUp from './SignInSignUp';
import Questions from './Questions';
import { register } from '../modules/Popup';
import Popups from '../components/Popups';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <Switch>
            <Route path="/questions" component={Questions} />
            <Route path={['/', '/signin', '/login']} component={SignInSignUp} />
          </Switch>
          <Popups ref={register} />
        </>
      </BrowserRouter>
    );
  }

}

export default App;
