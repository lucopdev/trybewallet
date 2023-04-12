// Esse reducer será responsável por tratar as informações da pessoa usuária
import { USER_INFO } from '../types/userTypes';

const INITIAL_STATE = {
  email: '',
  password: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_INFO:
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
};

export default user;
