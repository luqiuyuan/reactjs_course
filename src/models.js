import axios from 'axios';
import { SERVER_ADDRESS } from './constants';

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
    }
  }),
}

export const user_token = {
  state: null,
}
