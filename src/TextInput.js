import React, { Component } from 'react';

import styles from './styles/TextInput';

export default class TextInput extends Component {

    render() {
        return (
            <div style={styles.container}>

                <input placeholder={this.props.placeholder} style={styles.input} />

                <div style={styles.line} />

            </div>
        );
    }

}
