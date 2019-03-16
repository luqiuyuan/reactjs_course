import axios from 'axios';
import { SERVER_ADDRESS } from './constants';
import Popup from './modules/Popup';

export const user_token = {
  state: null,
  reducers: {
    set(state, payload) {
      return payload;
    }
  },
  effects: (dispatch) => ({
    create(payload, state) {
      let request = axios({
        method: 'post',
        url: SERVER_ADDRESS + '/user_tokens',
        data: {
          credential: {
            email: payload.email,
            password: payload.password,
          }
        },
        validateStatus: function (status) {
          return (status >= 200 && status < 300) || (status >= 400 && status < 500);
        },
      });
  
      request.then((response) => {
        if (response.status == 201) {
          dispatch.user_token.set(response.data.user_token);
  
          payload && payload.success_callback && payload.success_callback();
        } else if (response.status == 400) {
          let first_error = response.data.errors[0];
          if (first_error.code == 'invalid_credential') {
            Popup.warn("Email or password is incorrect! Please try again");
          } else {
            Popup.warn("Something expected happened T_T Please contact admin@bigfish.ca. (error code is " + first_error.code + ")");
          }
        } else {
          Popup.warn("Something expected happened T_T Please contact admin@bigfish.ca. (status is " + response.status + ")");
        }
      })
      .catch((error) => {
        Popup.warn("Something expected happened T_T Please contact admin@bigfish.ca. (error is " + error + ")");
      });
    }
  }),
};

export const users = {
  state: {},
  reducers: {
    add(state, payload) {
      let state_new = {...state, [payload.id]: payload};
      return state_new;
    }
  },
  effects: (dispatch) => ({
    create(payload, state) {
      let request = axios({
        method: 'post',
        url: SERVER_ADDRESS + '/users',
        data: {
          user: {
            email: payload.email,
            password: payload.password,
            name: payload.name,
          }
        },
        validateStatus: function (status) {
          return (status >= 200 && status < 300) || (status >= 400 && status < 500);
        },
      });
  
      request.then((response) => {
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
        } else {
          Popup.warn("Something expected happened T_T Please contact admin@bigfish.ca. (status is " + response.status + ")");
        }
      })
      .catch((error) => {
        Popup.warn("Something expected happened T_T Please contact admin@bigfish.ca. (error is " + error + ")");
      });
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
    getAll(payload, state) {
      // axios是网页端常用的网络访问组件，符合REST风格。这个组件的使用非常灵活，下面这句还可以写成
      // const request = axios.get(SERVER_ADDRESS + '/questions');
      // 更多axios的用法，可以参考它的文档：https://github.com/axios/axios
      const request = axios({
        method: 'get',
        url: SERVER_ADDRESS + '/questions',
        validateStatus: function (status) {
          return (status >= 200 && status < 300) || (status >= 400 && status < 500);
        },
      });

      request.then((response) => {
        if (response.status == 200) {
          dispatch.questions.set(response.data.questions);
        } else if (response.status == 404) {
          dispatch.questions.set([]);
        } else {
          Popup.warn("Something expected happened T_T Please contact admin@bigfish.ca. (status is " + response.status + ")");
        }
      })
      .catch((error) => {
        Popup.warn("Something expected happened T_T Please contact admin@bigfish.ca. (error is " + error + ")");
      });;
    },
    create(payload, state) {
      if (!state.user_token) {
        return;
      }

      const request = axios({
        method: 'post',
        url: SERVER_ADDRESS + '/questions',
        headers: {
          Authorization: JSON.stringify({
            user_token: {
              user_id: state.user_token.user_id,
              key: state.user_token.key,
            },
          }),
        },
        data: {
          question: {
            title: payload.title,
            content: payload.content,
          },
        },
        validateStatus: function (status) {
          return (status >= 200 && status < 300) || (status >= 400 && status < 500);
        },
      });

      request.then((response) => {
        if (response.status == 201) {
          payload && payload.success_callback && payload.success_callback();
        } else {
          Popup.warn("Something expected happened T_T Please contact admin@bigfish.ca. (status is " + response.status + ")");
        }
      })
      .catch((error) => {
        Popup.warn("Something expected happened T_T Please contact admin@bigfish.ca. (error is " + error + ")");
      });
    }
  }),
};
