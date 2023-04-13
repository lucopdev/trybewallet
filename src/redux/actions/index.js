import { USER_INFO } from '../types/userTypes';
import { DELETE_EXPENSE, REQUEST_SUCCESS, SUBMIT_EXPENSES } from '../types/walletTypes';

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
