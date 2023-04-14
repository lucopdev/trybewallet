import { USER_INFO } from '../types/userTypes';
import {
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  REQUEST_SUCCESS,
  SUBMIT_EXPENSES,
} from '../types/walletTypes';

export const userSubmit = (email, password) => ({
  type: USER_INFO,
  payload: { email, password },
});

export const requestSuccess = (currencyData) => ({
  type: REQUEST_SUCCESS,
  payload: currencyData,
});

export const fetchApiCurrencyThunk = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const allData = await response.json();
  dispatch(requestSuccess(allData));
};

export const submitExpenses = (expenseObject) => ({
  type: SUBMIT_EXPENSES,
  payload: expenseObject,
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  payload: id,
});

export const editExpense = (id) => ({
  type: EDIT_EXPENSE,
  payload: id,
});

// ...state.expenses.splice(state.idToEdit, 1, state.expenseToEdit[0]),
// expenses: state.expenses.filter((expense) => expense.id !== state.expenseToEdit[0].id),
