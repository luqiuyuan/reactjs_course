import React, { Component } from 'react';

import axios from 'axios';

import { SERVER_ADDRESS } from '../constants';

export default class Questions extends Component {

    componentDidMount() {
        const request = axios({
            method: 'get',
            url: SERVER_ADDRESS + '/questions',
        })
        
        request.then((response) => {
            console.log(response);
        });
    }

    render() {
        return null;
    }

}
