import axios from 'axios';
import { SERVER_ADDRESS } from './constants';
import { create } from 'domain';
import Popup from './modules/Popup'

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
      });

      request.then((response) => {
        dispatch.questions.set(response.data.questions);
      });
    },
    create(payload, state) {
      let request = axios({
        method: 'post',
        url: SERVER_ADDRESS + '/questions',
        headers: {
          'Authorization': JSON.stringify({
            user_token: {
              user_id: payload.user_token.user_id,
              key: payload.user_token.key,
            }
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
          payload.success_callback && payload.success_callback();

          dispatch.questions.getAll();
        } else {
          Popup.warn("Something expected happened T_T Please contact admin@bigfish.ca. (status is " + response.status + ")");
        }
      })
      .catch((error) => {
        Popup.warn("Something expected happened T_T Please contact admin@bigfish.ca. (error is " + error + ")");
      });
    }
  }),
}

export const user_token = {
  state: null,
}
