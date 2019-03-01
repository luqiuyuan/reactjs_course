import React, { Component } from 'react';

import axios from 'axios';

import { SERVER_ADDRESS } from '../constants';
import Header from '../components/Header';
import styles from './styles/Questions';

export default class Questions extends Component {

    componentDidMount() {
        const request = axios({
            method: 'get',
            url: SERVER_ADDRESS + '/questions',
        })
        
        request.then((response) => {
            this.setState({ questions: response.data.questions });
        });
    }

    render() {
        return (
            <div style={styles.container}>
                <Header avatarSrc={require('../assets/imgs/avatar_default.jpg')} />
            </div>
        );
    }

}
