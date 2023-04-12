// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_SUCCESS, SUBMIT_EXPENSES } from '../types/walletTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_SUCCESS:
    return {
      ...state,
      currencies: Object.keys(action.payload).filter((data) => data !== 'USDT'),
    };
  case SUBMIT_EXPENSES:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          ...action.payload,
        }],
    };
  default:
    return state;
  }
};

export default wallet;
