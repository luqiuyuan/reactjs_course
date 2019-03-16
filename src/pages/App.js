import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
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
            <Route path="/questions" render={() => <Questions />} />
            <Route path={['/', '/signin', '/login']} render={() => <SignInSignUp />} />
            <Redirect to="/login"/>
          </Switch>
          <Popups ref={register} />
        </>
      </BrowserRouter>
    );
  }

}

export default App;
