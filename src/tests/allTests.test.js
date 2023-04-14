import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

const initialState = {
  wallet: {
    currencies: [...Object.keys(mockData)],
    expenses: [{
      id: 0,
      value: '',
      description: 'Hot Dog',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: mockData,
    }],
    editor: false,
    idToEdit: 0,
    allData: mockData,
    expenseToEdit: {},
  },
};

describe('Testa a aplicação', () => {
  it('testa se existem elementos no componente de login', () => {
    renderWithRouterAndRedux(<App />);

    const logoLogin = screen.getByRole('img', { name: /logo-wallet/i });
    const emailInput = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    expect(logoLogin).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('Testa se ao clicar no botão de entrar é renderizado o componente wallet', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const submitButton = screen.getByRole('button', { name: /entrar/i });
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId('password-input');
    expect(submitButton).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, '123456');
    expect(submitButton).not.toBeDisabled();
    userEvent.click(submitButton);
    act(() => {
      history.push('/carteira');
    });
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
    expect(screen.getByText(/minha carteira:/i)).toBeInTheDocument();
  });

  it('Testa o componente Header', async () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });
    expect(screen.getByTestId('email-field')).toBeInTheDocument();

    const totalField = screen.getByTestId('total-field');
    const valueInput = screen.getByRole('spinbutton');
    const addExpense = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(valueInput, '25.40');
    userEvent.click(addExpense);

    expect(totalField.innerHTML).toBe('120.73');
  });

  it('Testa o funcionamento do form na pagina wallet', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });
    const valueInput = screen.getByRole('spinbutton');
    const currency = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');
    const description = screen.getByRole('textbox');
    const addExpense = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(valueInput, '25');
    expect(currency.value).toBe('USD');
    expect(method.value).toBe('Dinheiro');
    expect(tag.value).toBe('Alimentação');
    userEvent.type(description, 'McDonalds');
    userEvent.click(addExpense);

    expect(screen.getByRole('cell', { name: /mcdonalds/i })).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: /alimentação/i })[1]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: /dinheiro/i })[0]).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /25\.00/i })).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: /dólar americano\/real brasileiro/i })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: /4\.75/i })[0]).toBeInTheDocument();

    const editBtn = screen.getAllByRole('button', {
      name: /editar/i,
    });
    const deleteBtn = screen.getAllByRole('button', {
      name: /excluir/i,
    });

    userEvent.click(editBtn[0]);
    userEvent.type(valueInput, '34');
    const editExpenseBtn = screen.getByRole('button', { name: /editar despesa/i });
    userEvent.click(editExpenseBtn);
    expect(screen.getByRole('cell', { name: /34\.00/i })).toBeInTheDocument();

    userEvent.click(deleteBtn[0]);
    expect(description.value).toBe('');
  });
});
