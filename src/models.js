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