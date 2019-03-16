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
      // networking stuff here
    }
  }),
};

export const user = {
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
