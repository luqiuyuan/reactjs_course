import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignInSignUp from './SignInSignUp';
import Questions from './Questions';

class App extends Component {

  state = {
    user_token: null,
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/questions" render={() => <Questions userToken={this.state.user_token} />} />
          <Route path={['/', '/signin', '/login']} render={() => <SignInSignUp onLogin={this.onLogin} />}/>
        </Switch>
      </BrowserRouter>
    );
  }

  onLogin = (user_token) => {
    this.setState({ user_token });
  }

}

export default App;
