import { USER_INFO, REQUEST_SUCCESS } from '../types/userTypes';

export const userSubmit = (email, password) => ({
  type: USER_INFO,
  payload: { email, password },
});

export const requestSuccess = (data) => ({
  type: REQUEST_SUCCESS,
  payload: data,
});

export const fetchApiThunk = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const allData = await response.json();
  const noUSDT = Object.keys(allData).filter((data) => data !== 'USDT');
  dispatch(requestSuccess(noUSDT));
};
