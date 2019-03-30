import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import SignInSignUp from './SignInSignUp';
import Questions from './Questions';
import User from './User';
import { register } from '../modules/Popup';
import Popups from '../components/Popups';
import { connect } from 'react-redux';
import Header from '../components/Header';
import styles from './styles/App';


class App extends Component {

  render() {
    const { token } = this.props;
    return (
      <BrowserRouter>
        <>
          {token ?
            <div style={styles.page}>
              <Header avatarSrc={require('../assets/imgs/avatar_default.jpg')} />
              <Switch>
                <Route path="/questions" render={(props) => <Questions {...props} />} />
                <Route path="/users/:id" render={(props) => <User {...props} />} />
                <Redirect to="/questions" />
              </Switch>
            </div> :
            <Switch>
              <Route path={['/', '/signin', '/login']} render={() => <SignInSignUp onLogin={this.onLogin} />} />
              <Redirect to="/login" />
            </Switch>}
          <Popups ref={register} />
        </>
      </BrowserRouter>
    );
  }

}

export default connect(state => ({ token: state.user_token }))(App);
