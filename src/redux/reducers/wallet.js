// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  REQUEST_SUCCESS,
  SUBMIT_EXPENSES,
} from '../types/walletTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  allData: {},
  expenseToEdit: {},
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_SUCCESS:
    return {
      ...state,
      allData: action.payload,
      currencies: Object.keys(action.payload).filter((data) => data !== 'USDT'),
    };
  case SUBMIT_EXPENSES:
    if (!state.editor) {
      return {
        ...state,
        expenses: [
          ...state.expenses,
          {
            ...action.payload,
          }],
      };
    }
    if (state.editor) {
      return {
        ...state,
        editor: false,
        expenses: [
          ...state.expenses.filter((expense) => expense.id !== state.expenseToEdit.id),
          {
            ...action.payload,
          },
        ].sort((a, b) => a.id - b.id),
      };
    }
    break;
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
      expenseToEdit: state.expenses.filter((expense) => expense.id === action.payload)[0],
    };
  default:
    return state;
  }
};

export default wallet;
