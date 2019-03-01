import React, { Component } from 'react';

import axios from 'axios';

import { SERVER_ADDRESS } from '../constants';
import Header from '../components/Header';
import styles from './styles/Questions';
import Question from '../components/Question';

export default class Questions extends Component {
    
    state = {
        questions: null,
    }

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
                {this.state.questions
                ? <QuestionList questions={this.state.questions} />
                : null
                }
            </div>
        );
    }

}

function QuestionList(props) {
    if (props.questions) {
        return (
            <div style={styles.question_list_container}>
            {
                props.questions.map((question) => {
                    return (
                        <Question
                            title={question.title}
                            content={question.content} />
                    );
                })
            }
            </div>
        );
    } else {
        return null;
    }
}
