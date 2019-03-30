import axios from 'axios';
import { SERVER_ADDRESS } from './constants';
import Popup from './modules/Popup';

export const user_token = {
  state: JSON.parse(localStorage.getItem('user_token')),
  reducers: {
    set(state, payload) {
      return payload;
    }
  },
  effects: (dispatch) => ({
    create(payload, state) {
      callApi({
        method: 'post',
        uri: '/user_tokens',
        data: {
          credential: {
            email: payload.email,
            password: payload.password,
          }
        },
        errHandlers: status => status == 400
      }).then((response) => {
        if (response.status == 201) {
          localStorage.setItem('user_token', JSON.stringify(response.data.user_token))
          dispatch.user_token.set(response.data.user_token);
          payload && payload.success_callback && payload.success_callback();
        } else if (response.status == 400) {
          let first_error = response.data.errors[0];
          if (first_error.code == 'invalid_credential') {
            Popup.warn("Email or password is incorrect! Please try again");
          } else {
            Popup.warn("Something expected happened T_T Please contact admin@bigfish.ca. (error code is " + first_error.code + ")");
          }
        }
      })

    }
  }),
};

export const users = {
  state: {},
  reducers: {
    add(state, payload) {
      let state_new = { ...state, [payload.id]: payload };
      return state_new;
    }
  },
  effects: (dispatch) => ({
    create(payload, state) {

      callApi({
        method: 'post',
        uri: '/users',
        data: {
          user: {
            email: payload.email,
            password: payload.password,
            name: payload.name,
          }
        },
        errHandlers: status => status == 400
      }).then((response) => {
        if (response.status == 201) {
          dispatch.users.add(response.data.user);
          Popup.warn("Congradulations! Your registration was successful!");

          payload && payload.success_callback && payload.success_callback();
        } else if (response.status == 400) {
          let first_error = response.data.errors[0];
          if (first_error.code == 'duplicated_field') {
            Popup.warn("This email has already been registered.");
          } else {
            Popup.warn("Something expected happened T_T Please contact admin@bigfish.ca. (error code is " + first_error.code + ")");
          }
        }
      })

    },
    async getUser({ id, success_callback }){
     const response = await callApi({uri: `/users/${id}`});
     dispatch.users.add(response.data.user);
     
     if (response.status == 200) {
       success_callback && success_callback(response.data.user);
     }
    }
  })
};

export const questions = {
  state: [],
  reducers: {
    set(state, payload) {
      return payload;
    }
  },
  effects: (dispatch) => ({
    getAll(payload, rootState, state) {
      callApi({
        uri: '/questions',
        user_token: rootState.user_token,
        errHandlers: status => status === 404
      }).then(response => {
        if (response && response.status == 200) {
          dispatch.questions.set(response.data.questions);
        } else if (response && response.status == 404) {
          dispatch.questions.set([]);
        }
      })
    },
    create(payload, state) {
      if (!state.user_token) {
        Popup.warn("You have not logged in");
        return;
      }

      callApi({
        method: 'post',
        uri: '/questions',
        user_token: state.user_token,
        data: {
          question: {
            title: payload.title,
            content: payload.content,
          }
        },
      }).then(response => {
        if (response && response.status == 201) {
          payload && payload.success_callback && payload.success_callback();
        }
      }
      )
    },
    async like({ question_id, success_callback, fail_callback }, rootState) {
      const response = await callApi({
        method: 'post',
        uri: `/questions/${question_id}/like`,
        user_token: rootState.user_token,
        errHandlers: status => status == 400 || status == 404,
      });

      if (response && response.status == 201) {
       success_callback && success_callback();
      } else {
        fail_callback && fail_callback();
      }
    },
    async dislike({ question_id, success_callback, fail_callback }, rootState) {
      const response = await callApi({
        method: 'delete',
        uri: `/questions/${question_id}/like`,
        user_token: rootState.user_token,
        errHandlers: status => status == 400 || status == 404,
      });

      if (response && response.status == 200) {
        success_callback && success_callback();
      } else {
        fail_callback && fail_callback();
      }
    }
  }),
};


export const answers = {
  state: {},
  reducers: {
    update(state, payload) {
      return {
        ...state,
        ...payload
      }
    }
  },
  effects: dispatch => ({
    async getAnswers(question_id, rootState) {
      const response = await callApi({
        uri: `/questions/${question_id}/answers`,
        user_token: rootState.user_token,
        errHandlers: status => status == 404
      })

      if (response.status == 200) {
        dispatch.answers.update({
          [question_id]: response.data.answers
        })
      }
    },

    async create({ question_id, content }, rootState) {
      const response = await callApi({
        method: 'post',
        uri: `/questions/${question_id}/answers`,
        user_token: rootState.user_token,
        data: {
          answer: {
            content
          }
        }
      })


      return response.data
    }
  })
}



function callApi({ method = 'get', uri, data, user_token, errHandlers = status => false }) {

  // axios是网页端常用的网络访问组件，符合REST风格。这个组件的使用非常灵活，下面这句还可以写成
  // const request = axios.get(SERVER_ADDRESS + '/questions');
  // 更多axios的用法，可以参考它的文档：https://github.com/axios/axios
  const auth = user_token ? {
    Authorization: JSON.stringify({
      user_token: {
        user_id: user_token.user_id,
        key: user_token.key,
      },
    })
  } : {}
  const request = axios({
    method: method,
    url: SERVER_ADDRESS + uri,
    validateStatus: function (status) {
      return (status >= 200 && status < 300) || errHandlers(status);
    },
    data,
    headers: { ...auth }
  });

  return request.then((response) => response)
    .catch((error) => {
      Popup.warn("Something unexpected happened T_T Please contact admin@bigfish.ca. (error is " + error + ")");
      throw new Error('Something unexpected happened')
    });
}

