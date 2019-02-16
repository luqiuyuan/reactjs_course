import React, { Component } from 'react';
import styles from './styles/App';
import TextInput from './TextInput';
import Button from './Button';

class App extends Component {
  render() {
    return (
      <div style={styles.container}>

        <div style={styles.panel}>

          <p style={styles.header}>BIG FISH</p>
          
          <TextInput placeholder="Email" />
          <TextInput placeholder="Password" />
          <TextInput placeholder="Name" />

          <Button label="Signup" />

          <div style={styles.placeholder} />

          <div style={styles.footer}>
            <p style={styles.footer_text}>Already have an account?</p>
            <p style={styles.footer_link}>Login</p>
          </div>

        </div>

      </div>
    );
  }
}

export default App;
