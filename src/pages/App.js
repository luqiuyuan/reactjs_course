import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import SignInSignUp from './SignInSignUp';
import Questions from './Questions';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={['/login', '/', '/signup']} component={SignInSignUp} />  
        <Route path="/questions" component={Questions}/>
      </Switch>
    );
  }

}

export default App;
